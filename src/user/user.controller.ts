import {
	Body,
	Controller,
	Header,
	Post,
	Put,
	Get,
	UseGuards,
	Req,
	Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
	AccountNameValidRequestDto,
	EmailValidRequestDto,
	ProfileUpdateRequestDto,
	ProfileResponseDto,
	RegisterRequestDto,
} from './dto/user.dto';
import { HandleErrors } from '@util/error-decorator';
import { JwtAuthGuard } from '@user/auth/guards/jwt-auth.guard';

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
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async updateProfile(
		@Req() req,
		@Body() body: ProfileUpdateRequestDto,
	): Promise<ProfileResponseDto> {
		return await this.userService.updateProfile(req.user._id, body);
	}

	@Get('myinfo')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async getMyInfo(@Req() req): Promise<ProfileResponseDto> {
		return await this.userService.getMyInfo(req.user._id);
	}

	@Get('searchuser')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async searchUser(@Query('keyword') keyword: string) {
		return await this.userService.searchUsers(keyword);
	}
}
