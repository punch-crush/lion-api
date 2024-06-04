import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDTO {
	@IsString()
	@IsNotEmpty({ message: '내용 또는 이미지를 입력해주세요' })
	content: string;

	@IsString()
	@IsNotEmpty({ message: '내용 또는 이미지를 입력해주세요' })
	image: string; // "image1, image2" 형식
}

export class UpdatePostDTO extends CreatePostDTO {}
