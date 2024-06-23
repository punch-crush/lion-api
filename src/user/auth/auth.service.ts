import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.usersService.findUser(email, password);
		return user;
	}

	async login(user: any) {
		const payload = { email: user.email, sub: user._id };
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}
}
