import { IsString, IsNumber, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { ProfileResponse } from '@user/dto/user-base.dto';
import { Type } from 'class-transformer';

export class Product {
	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	itemName: string;

	@IsNumber({}, { message: '가격은 숫자로 입력해야 합니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	price: number;
	link: string;
	itemImage: string;
}

export class CreateProductDTO {
	@ValidateNested()
	@Type(() => Product)
	product: Product;
}

export class UpdateProductDTO extends CreateProductDTO {}

export class InProductResponse extends Product {
	@ValidateNested()
	@Type(() => ProfileResponse)
	author: ProfileResponse;
}

export class ProductResponse {
	product: InProductResponse;
}

export class ProductListDTO {
	@IsNumber()
	data: number = 0;

	@IsArray()
	product: InProductResponse[];
}
