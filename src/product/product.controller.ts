import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Req,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './product.dto';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';

@Controller()
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post('/')
	@UseGuards(JwtAuthGuard)
	//BUG: @Req에 express Request type을 작성해주면 _id가 없다고 에러남
	async createProduct(@Body() productDTO: CreateProductDTO, @Req() req) {
		if (!req.user) {
			throw new UnauthorizedException();
		}

		const { _id } = req.user;
		return this.productService.createProduct(productDTO, _id);
	}

	@Get('/:accountname')
	@UseGuards(JwtAuthGuard)
	async getProducts(@Param('accountname') accountname: string) {
		return this.productService.getProducts(accountname);
	}
}
