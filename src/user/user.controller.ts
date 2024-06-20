import { Body, Controller, Header, Post } from '@nestjs/common';
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

	//TODO ProfileResponseDto 범용성 있게 이름 변경
	@Put()
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async updateProfile(
		@Req() req,
		@Body() body: ProfileUpdateRequestDto,
	): Promise<ProfileResponseDto> {
		try {
			return await this.userService.updateProfile(req.user._id, body);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Get('myinfo')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getMyInfo(@Req() req): Promise<ProfileResponseDto> {
		try {
			return await this.userService.getMyInfo(req.user._id);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
