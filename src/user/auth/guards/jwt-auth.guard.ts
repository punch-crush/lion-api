import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	handleRequest(err: Error, user) {
		if (err || !user) {
			throw new HttpException('유효하지 않은 토큰입니다', HttpStatus.UNAUTHORIZED);
		}
		return user;
	}
}
