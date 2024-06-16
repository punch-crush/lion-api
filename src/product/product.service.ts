import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@user/user.schema';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDTO, ProductResponse, ProductListDTO } from '@product/product.dto';

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
		const productDocument = await this.productModel.findOne({ _id: product._id }).lean();
		//[ ] password 제외하고 가져옴
		const authorDocument = await this.userModel
			.findOne({ _id: id }, { password: 0 })
			.lean();
		const authorRes = {
			...authorDocument,
			followerCount: authorDocument.follower.length,
			followingCount: authorDocument.following.length,
			isfollow: false, //FIXME 추후 수정 필요
		};
		const newProduct: ProductResponse = {
			product: {
				...productDocument,
				author: authorRes,
			},
		};
		return newProduct;
	}

	async getProducts(accountname: string): Promise<ProductListDTO> {
		const user = await this.userModel.findOne({ accountname }, { password: 0 }).lean();
		const products = await this.productModel.find({ author: user._id }).lean();
		const author = {
			...user,
			followerCount: user.follower.length,
			followingCount: user.following.length,
			isfollow: false, //FIXME 추후 수정 필요
		};
		const productsRes = products.map(product => {
			return {
				...product,
				author: author,
			};
		});
		return {
			data: products.length,
			product: productsRes,
		};
	}
}
