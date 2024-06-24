import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '@user/user.schema';
import { Product, ProductDocument } from './product.schema';
import {
	CreateProductDTO,
	UpdateProductDTO,
	ProductResponse,
	ProductListDTO,
	InProductResponse,
} from '@product/product.dto';
import { getIsFollow } from '@util/helper';
import { PostService } from '@post/post.service';
import { UserService } from '@user/user.service';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<ProductDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
		private postService: PostService,
		private userService: UserService,
	) {}

	async createProduct(
		productDTO: CreateProductDTO,
		id: string,
	): Promise<ProductResponse> {
		const product = await this.productModel.create({ ...productDTO.product, author: id });
		const productDocument = await this.productModel.findById(product._id);

		const author = await this.userService.getUserById(id);

		const newProduct: ProductResponse = {
			product: {
				...productDocument.readOnlyData,
				author: author.readOnlyData,
			},
		};
		return newProduct;
	}

	async getSingleProduct(
		product: ProductDocument,
		userId: string,
	): Promise<InProductResponse> {
		const author = await this.userService.getUserById(product.author);
		const isfollow = getIsFollow(author, userId);
		const newProduct: InProductResponse = {
			...product.readOnlyData,
			author: {
				...author.readOnlyData,
				isfollow,
			},
		};
		return newProduct;
	}

	async getProductList(
		accountname: string,
		limit?: number,
		skip?: number,
	): Promise<ProductListDTO> {
		const user = await this.userService.getUserByAccountName(accountname);
		const userId = user._id.toString();
		const products = await this.productModel
			.find({ author: userId })
			.limit(limit)
			.skip(skip);

		const productsRes = await Promise.all(
			products.map(product => this.getSingleProduct(product, userId)),
		);
		return {
			data: products.length,
			product: productsRes,
		};
	}

	async getProductId(postId: string): Promise<ProductDocument> {
		if (!Types.ObjectId.isValid(postId)) {
			throw new HttpException('존재하지 않는 상품입니다.', HttpStatus.NOT_FOUND);
		}
		const product = await this.productModel.findById(postId);
		if (!product) {
			throw new HttpException('존재하지 않는 상품입니다.', HttpStatus.NOT_FOUND);
		}
		return product;
	}

	async getProductDetail(productId: string, userId: string): Promise<ProductResponse> {
		const product = await this.getProductId(productId);
		const author = await this.userService.getUserById(product.author);
		const isfollow = getIsFollow(author, userId);
		const productRes = {
			product: {
				...product.readOnlyData,
				author: {
					...author.readOnlyData,
					isfollow,
				},
			},
		};
		return productRes;
	}

	async updateProduct(
		productId: string,
		productDTO: UpdateProductDTO,
		userId: string,
	): Promise<ProductResponse> {
		const product = await this.getProductId(productId);
		await this.postService.compareAuthorAndUser(product.author, userId);
		await this.productModel.findByIdAndUpdate(productId, productDTO.product, {
			new: true,
		});
		const updatedProductRes = await this.getProductDetail(productId, userId);
		return updatedProductRes;
	}

	async deleteProduct(productId: string, userId: string) {
		const product = await this.getProductId(productId);
		await this.postService.compareAuthorAndUser(product.author, userId);
		await this.productModel.findByIdAndDelete(productId);
		return {
			message: '상품이 삭제되었습니다',
		};
	}
}
