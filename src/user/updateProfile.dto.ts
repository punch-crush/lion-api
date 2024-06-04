import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class UpdateProfileDTO {
	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	username: string;

	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	@Matches(/^[a-zA-Z0-9_.]+$/, {
		message: '계정 이름은 영문자, 숫자, 점(.), 밑줄(_)만 포함해야 합니다',
	})
	accountname: string;

	@IsString()
	intro: string; // ''

	@IsString()
	image: string;
}
