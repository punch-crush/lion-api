import { Body, Controller, Header, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
	AccountNameValidRequestDto,
	EmailValidRequestDto,
	ProfileUpdateRequestDto,
	RegisterRequestDto,
} from './dto/user.dto';
import { HandleErrors } from '@util/error-decorator';

@Controller('')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/')
	@Header('content-type', 'application/json')
	@HandleErrors()
	async register(@Body() body: RegisterRequestDto) {
		return await this.userService.register(body);
	}

	@Post('/emailvalid')
	@Header('content-type', 'application/json')
	@HandleErrors()
	async validateEmail(@Body() user: EmailValidRequestDto) {
		const { email } = user.user;
		return await this.userService.validateEmail(email);
	}

	@Post('/accountnamevalid')
	@Header('content-type', 'application/json')
	@HandleErrors()
	async validateAccountName(@Body() user: AccountNameValidRequestDto) {
		const { accountname } = user.user;
		return await this.userService.validateAccountName(accountname);
	}

	@Put()
	async updateProfile(
		@Headers('Authorization') authHeader: string,
		@Body() body: ProfileUpdateRequestDto,
	) {
		try {
			const token = authHeader.split(' ')[1];
			token;
			// const decode = jwt토큰 디코딩으로 email 받아왔다고 가정
			const email = 'char@char.com';
			return await this.userService.updateProfile(email, body);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Get('myinfo')
	async getMyInfo(@Headers('Authorization') authHeader: string) {
		try {
			const token = authHeader.split(' ')[1];
			token;
			// const decode = jwt토큰 디코딩으로 email 받아왔다고 가정
			const email = 'char@char.com';
			return await this.userService.getMyInfo(email);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
