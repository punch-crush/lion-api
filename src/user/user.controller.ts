import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
	AccountNameValidRequestDto,
	EmailValidRequestDto,
	RegisterRequestDto,
} from './dto/user.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('emailvalid')
	async validateEmail(@Body() user: EmailValidRequestDto) {
		try {
			const { email } = user.user;
			return await this.userService.validateEmail(email);
		} catch (error) {
			throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post('accountnamevalid')
	async validateAccountName(@Body() user: AccountNameValidRequestDto) {
		try {
			const { accountname } = user.user;
			return await this.userService.validateAccountName(accountname);
		} catch (error) {
			throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Post()
	async register(@Body() body: RegisterRequestDto) {
		return await this.userService.register(body);
	}
}
