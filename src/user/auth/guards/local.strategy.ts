import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'user[email]',
			passwordField: 'user[password]',
			passReqToCallback: true,
		});
	}

	async validate(@Req() req: any, email: string, password: string): Promise<any> {
		if (!email) {
			if (!password)
				throw new HttpException(
					'이메일 또는 비밀번호를 입력해주세요.',
					HttpStatus.BAD_REQUEST,
				);
			throw new HttpException('이메일을 입력해주세요.', HttpStatus.BAD_REQUEST);
		} else if (!password)
			throw new HttpException('비밀번호를 입력해주세요.', HttpStatus.BAD_REQUEST);
		return await this.authService.validateUser(email, password);
	}
}
