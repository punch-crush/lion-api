export interface ProductDTO {
	readonly id: string;
	itemName: string;
	price: number;
	link: string;
	itemImage: string;
	authorId: string;
}

export interface ProductListDTO {
	data: number;
	product: ProductDTO[];
}
