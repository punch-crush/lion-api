import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateImageDTO {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@Matches(/\.(jpg|gif|png|jpeg|bmp|tif|heic)$/i, {
		message: '이미지 파일만 업로드가 가능합니다.',
	})
	value: string;
}
