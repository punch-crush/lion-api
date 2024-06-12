import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

class EmailDto {
	@IsString()
	@IsEmail({}, { message: '잘못된 이메일 형식입니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	email: string;
}

class AccountName {
	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	@Matches(/^[a-zA-Z0-9_.]+$/, {
		message: '계정 이름은 영문자, 숫자, 점(.), 밑줄(_)만 포함해야 합니다',
	})
	accountname: string;
}

export class ValidateEmailDto {
	user: EmailDto;
}

export class ValidateAccountNameDto {
	user: AccountName;
}
