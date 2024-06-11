import {
	AccountNameValidRequest,
	EmailValidRequest,
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
} from '@user/dto/user-base.dto';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class RegisterRequestDto {
	@ValidateNested()
	@Type(() => RegisterRequest)
	user: RegisterRequest;
}

export class RegisterResponseDto {
	@IsString()
	message: string;

	@ValidateNested()
	@Type(() => RegisterResponse)
	user: RegisterResponse;
}

export class LoginRequestDto {
	@ValidateNested()
	@Type(() => LoginRequest)
	user: LoginRequest;
}

export class LoginResponseDto {
	@ValidateNested()
	@Type(() => LoginResponse)
	user: LoginResponse;
}

export class EmailValidRequestDto {
	@ValidateNested()
	@Type(() => EmailValidRequest)
	user: EmailValidRequest;
}

export class AccountNameValidRequestDto {
	@ValidateNested()
	@Type(() => AccountNameValidRequest)
	user: AccountNameValidRequest;
}
