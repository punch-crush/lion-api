import { IsString, IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class UserDTO {
	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	username: string;

	@IsString()
	@IsEmail({}, { message: '잘못된 이메일 형식입니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	email: string;

	@IsString()
	@MinLength(6, { message: '비밀번호는 6자 이상이어야 합니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	password: string;

	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	@Matches(/^[a-zA-Z0-9_.]+$/, {
		message: '계정 이름은 영문자, 숫자, 점(.), 밑줄(_)만 포함해야 합니다',
	})
	accountname: string;

	@IsString()
	intro: string;

	@IsString()
	image: string; // 빈문자열일 경우 기본 이미지 넣어주기
}

export class RegisterUserDTO {
	user: UserDTO;
}
