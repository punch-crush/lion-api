import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// IsNotEmptyBoth 사용해보기
export class LoginUserDTO {
	@IsEmail({}, { message: '잘못된 이메일 형식입니다' })
	@IsNotEmpty({ message: '이메일을 입력해주세요' })
	email: string;

	@IsString()
	@IsNotEmpty({ message: '비밀번호를 입력해주세요' })
	@MinLength(6, { message: '비밀번호는 6자 이상이어야 합니다.' })
	password: string;
}

// TODO
// email, password를 일치하지 않을 때
// {
//     "message": "이메일 또는 비밀번호가 일치하지 않습니다.",
//     "status": 422
// }
