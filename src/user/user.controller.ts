import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Query,
} from '@nestjs/common';
import { RegisterUserDTO } from './registerUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('emailvalid')
	async emailValid(@Query('email') email: string) {
		try {
			return await this.userService.validateEmail(email);
		} catch (error) {
			throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Get('accountnamevalid')
	async accountnameValid(@Query('accountname') accountname: string) {
		try {
			return await this.userService.validateAccountName(accountname);
		} catch (error) {
			throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('user')
	register(@Body() body: RegisterUserDTO) {
		return this.userService.register(body);
	}
}
