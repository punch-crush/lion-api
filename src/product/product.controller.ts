import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Req,
	UnauthorizedException,
	UseGuards,
	Header,
	Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './product.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';

@Controller()
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post('/')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async createProduct(@Body() productDTO: CreateProductDTO, @Req() req) {
		if (!req.user) {
			throw new UnauthorizedException();
		}

		const { _id } = req.user;
		return this.productService.createProduct(productDTO, _id);
	}

	@Get('/:accountname')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getProductList(
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@Param('accountname') accountname: string,
	) {
		const limitNumber = limit ? parseInt(limit) : 10;
		const skipNumber = skip ? parseInt(skip) : 0;
		return this.productService.getProductList(accountname, limitNumber, skipNumber);
	}

	@Get('/detail/:productId')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getProductDetail(@Param('productId') productId: string) {
		return this.productService.getProductDetail(productId);
	}
}
