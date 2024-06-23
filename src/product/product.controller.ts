import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Req,
	UseGuards,
	Header,
	Query,
	Put,
	Delete,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
	CreateProductDTO,
	UpdateProductDTO,
	ProductResponse,
	ProductListDTO,
} from './product.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';

@Controller()
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post('/')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async createProduct(
		@Body() productDTO: CreateProductDTO,
		@Req() req,
	): Promise<ProductResponse> {
		try {
			return this.productService.createProduct(productDTO, req.user._id);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Get('/:accountname')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getProductList(
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@Param('accountname') accountname: string,
	): Promise<ProductListDTO> {
		const limitNumber = limit ? parseInt(limit) : 10;
		const skipNumber = skip ? parseInt(skip) : 0;
		try {
			return this.productService.getProductList(accountname, limitNumber, skipNumber);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Get('/detail/:productId')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getProductDetail(
		@Param('productId') productId: string,
		@Req() req,
	): Promise<ProductResponse> {
		try {
			return this.productService.getProductDetail(productId, req.user._id);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Put('/:product_id')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async updateProduct(
		@Req() req,
		@Param('product_id') productId: string,
		@Body() productDTO: UpdateProductDTO,
	): Promise<ProductResponse> {
		try {
			return this.productService.updateProduct(productId, productDTO, req.user._id);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Delete('/:product_id')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async deleteProduct(@Req() req, @Param('product_id') productId: string) {
		try {
			return this.productService.deleteProduct(productId, req.user._id);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
