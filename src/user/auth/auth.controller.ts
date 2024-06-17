import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UnauthorizedException } from '@nestjs/common';

@Controller('login')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post()
	async logIn(@Req() req) {
		if (!req.user) {
			throw new UnauthorizedException();
		}
		const jwt = await this.authService.login(req.user);
		// res.cookie('Authorization', `Bearer ${jwt.accessToken}`);
		const { _id, ...ret } = req.user;
		void _id;
		return { ...ret, token: jwt.accessToken };
	}
}
