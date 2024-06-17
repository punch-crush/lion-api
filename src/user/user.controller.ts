import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
	AccountNameValidRequestDto,
	EmailValidRequestDto,
	RegisterRequestDto,
} from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async register(@Body() body: RegisterRequestDto) {
		return await this.userService.register(body);
	}

	@Post('emailvalid')
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

	@Post('accountnamevalid')
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

	@Get('searchuser')
	@UseGuards(JwtAuthGuard)
	async searchUser(@Query('keyword') keyword: string) {
		try {
			return await this.userService.searchUsers(keyword);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
