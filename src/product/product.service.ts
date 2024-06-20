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

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<ProductDocument>,
		@InjectModel(User.name) private userModel: Model<UserDocument>,
	) {}

	async createProduct(
		productDTO: CreateProductDTO,
		id: string,
	): Promise<ProductResponse> {
		const product = await this.productModel.create({ ...productDTO.product, author: id });
		const productDocument = await this.productModel.findById(product._id);

		const author = await this.userModel.findById(id);

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
		const user = await this.userModel.findById(userId);
		const author = await this.userModel.findById(product.author);
		if (!author) {
			throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
		}
		const isfollow = author.follower.includes(user.accountname);
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
		const user = await this.userModel.findOne({ accountname });
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

	async getProductDetail(productId: string): Promise<ProductResponse> {
		const product = await this.getProductId(productId);
		const author = await this.userModel.findById(product.author);
		const isfollow = author.follower.includes(author.accountname);
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
		const author = await this.userModel.findById(product.author);
		if (author._id.toString() !== userId) {
			throw new HttpException(
				'잘못된 요청입니다. 로그인 정보를 확인하세요',
				HttpStatus.FORBIDDEN,
			);
		}
		await this.productModel.findByIdAndUpdate(productId, productDTO.product, {
			new: true,
		});
		const updatedProductRes = await this.getProductDetail(productId);
		return updatedProductRes;
	}

	async deleteProduct(productId: string, userId: string) {
		try {
			const product = await this.getProductId(productId);
			const author = await this.userModel.findById(product.author);
			if (author._id.toString() !== userId) {
				throw new HttpException(
					'잘못된 요청입니다. 로그인 정보를 확인하세요',
					HttpStatus.FORBIDDEN,
				);
			}
			await this.productModel.findByIdAndDelete(productId);
			return {
				message: '상품이 삭제되었습니다',
			};
		} catch (error) {
			throw new HttpException('등록된 상품이 없습니다', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
