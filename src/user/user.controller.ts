import { Body, Controller, Header, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
	AccountNameValidRequestDto,
	EmailValidRequestDto,
	RegisterRequestDto,
} from './dto/user.dto';
import { HandleErrors } from 'src/util/error-decorator';

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
}
