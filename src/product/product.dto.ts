import { IsString, IsNumber, IsNotEmpty, IsObject } from 'class-validator';

export class ProductDTO {
	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	itemName: string;

	@IsNumber()
	@IsString({ message: '가격은 숫자로 입력하셔야 합니다' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	price: number;

	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	link: string;

	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	itemImage: string;
	authorId: string;
}

export class UpdateProductDTO extends ProductDTO {}

export class ProductResponse extends ProductDTO {
	@IsObject()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	author: object; // 여기에 user dto를 넣어주어야하는가?
}
