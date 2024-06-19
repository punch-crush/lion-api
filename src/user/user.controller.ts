import {
	Body,
	Controller,
	Header,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
	AccountNameValidRequestDto,
	EmailValidRequestDto,
	RegisterRequestDto,
} from './dto/user.dto';

@Controller('')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/')
	@Header('content-type', 'application/json')
	async register(@Body() body: RegisterRequestDto) {
		return await this.userService.register(body);
	}

	@Post('/emailvalid')
	@Header('content-type', 'application/json')
	async validateEmail(@Body() user: EmailValidRequestDto) {
		try {
			const { email } = user.user;
			return await this.userService.validateEmail(email);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Post('/accountnamevalid')
	@Header('content-type', 'application/json')
	async validateAccountName(@Body() user: AccountNameValidRequestDto) {
		try {
			const { accountname } = user.user;
			return await this.userService.validateAccountName(accountname);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
