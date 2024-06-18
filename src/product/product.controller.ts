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
	async getProducts(@Param('accountname') accountname: string) {
		return this.productService.getProducts(accountname);
	}
}
