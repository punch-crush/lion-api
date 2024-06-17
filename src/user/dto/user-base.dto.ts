import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MinLength,
	IsArray,
	IsNumber,
} from 'class-validator';

export class UserCommon {
	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	username: string;

	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	@Matches(/^[a-zA-Z0-9_.]+$/, {
		message: '계정 이름은 영문자, 숫자, 점(.), 밑줄(_)만 포함해야 합니다',
	})
	accountname: string;
}

export class RegisterRequest extends UserCommon {
	@IsString()
	@IsEmail({}, { message: '잘못된 이메일 형식입니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	email: string;

	@IsString()
	@MinLength(6, { message: '비밀번호는 6자 이상이어야 합니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	password: string;

	@IsString()
	intro: string;

	@IsString()
	image: string; // 빈문자열일 경우 기본 이미지 넣어주기
}

export class RegisterResponse extends UserCommon {
	@IsString()
	@IsEmail({}, { message: '잘못된 이메일 형식입니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	email: string;

	@IsString()
	intro: string;

	@IsString()
	image: string;
}

export class LoginRequest {
	@IsString()
	@IsEmail({}, { message: '잘못된 이메일 형식입니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	email: string;

	@IsString()
	@MinLength(6, { message: '비밀번호는 6자 이상이어야 합니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	password: string;
}

export class LoginResponse extends UserCommon {
	@IsString()
	@IsEmail({}, { message: '잘못된 이메일 형식입니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	email: string;

	@IsString()
	image: string;

	@IsString()
	token: string;
}

export class UserSearchResponse extends UserCommon {
	@IsBoolean()
	isfollow: boolean;

	@IsArray()
	@IsString({ each: true })
	follower: string[];

	@IsArray()
	@IsString({ each: true })
	following: string[];

	@IsNumber()
	followerCount: number;

	@IsNumber()
	followingCount: number;
}

export class UserInfoCommon extends UserSearchResponse {
	@IsString()
	image: string;
}

export class EmailValidRequest {
	@IsString()
	@IsEmail({}, { message: '잘못된 이메일 형식입니다.' })
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	email: string;
}

export class AccountNameValidRequest {
	@IsString()
	@IsNotEmpty({ message: '필수 입력사항을 입력해주세요' })
	@Matches(/^[a-zA-Z0-9_.]+$/, {
		message: '계정 이름은 영문자, 숫자, 점(.), 밑줄(_)만 포함해야 합니다',
	})
	accountname: string;
}

export class ProfileUpdateRequest extends UserCommon {
	@IsString()
	intro: string;

	@IsString()
	image: string;
}

export class ProfileUpdateResponse extends ProfileUpdateRequest {
	@IsArray()
	@IsString({ each: true })
	follower: string[];

	@IsArray()
	@IsString({ each: true })
	following: string[];

	@IsNumber()
	followerCount: number;

	@IsNumber()
	followingCount: number;
}
