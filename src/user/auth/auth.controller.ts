import { Controller, Get, Headers, Header, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { HandleErrors } from '@util/error-decorator';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@HandleErrors()
	@Post('user/login')
	async logIn(@Req() req) {
		const jwt = await this.authService.login(req.user);
		return {
			user: {
				...req.user,
				token: jwt.accessToken,
			},
		};
	}

	@Get('user/checktoken')
	@Header('content-type', 'application/json')
	async checkToken(@Req() req, @Headers('Authorization') authorization: string) {
		if (!authorization || !authorization.startsWith('Bearer ')) {
			return { isValid: false };
		}
		const token = authorization.split(' ')[1];
		const isValid = this.authService.validateToken(token);
		return { isValid };
	}
}
