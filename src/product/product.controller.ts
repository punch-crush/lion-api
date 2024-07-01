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
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
	CreateProductDTO,
	UpdateProductDTO,
	ProductResponse,
	ProductListDTO,
} from './product.dto';
import { JwtAuthGuard } from '@user/auth/guards/jwt-auth.guard';
import { HandleErrors } from '@util/error-decorator';

@Controller()
export class ProductController {
	constructor(private productService: ProductService) {}

	@Post('/')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async createProduct(
		@Body() productDTO: CreateProductDTO,
		@Req() req,
	): Promise<ProductResponse> {
		return this.productService.createProduct(productDTO, req.user._id);
	}

	@Get('/:accountname')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async getProductList(
		@Query('limit') limit: string,
		@Query('skip') skip: string,
		@Param('accountname') accountname: string,
	): Promise<ProductListDTO> {
		const limitNumber = limit ? parseInt(limit) : 10;
		const skipNumber = skip ? parseInt(skip) : 0;
		return this.productService.getProductList(accountname, limitNumber, skipNumber);
	}

	@Get('/detail/:productId')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async getProductDetail(
		@Param('productId') productId: string,
		@Req() req,
	): Promise<ProductResponse> {
		return this.productService.getProductDetail(productId, req.user._id);
	}

	@Put('/:product_id')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async updateProduct(
		@Req() req,
		@Param('product_id') productId: string,
		@Body() productDTO: UpdateProductDTO,
	): Promise<ProductResponse> {
		return this.productService.updateProduct(productId, productDTO, req.user._id);
	}

	@Delete('/:product_id')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async deleteProduct(@Req() req, @Param('product_id') productId: string) {
		return this.productService.deleteProduct(productId, req.user._id);
	}
}
