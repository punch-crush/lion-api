import { UserOtherProfileRes } from '@user/user.dto';

export interface ProductDTO {
	readonly id: string;
	itemName: string;
	price: number;
	link: string;
	itemImage: string;
	author: UserOtherProfileRes;
}

export interface ProductListDTO {
	data: number;
	product: ProductDTO[];
}
