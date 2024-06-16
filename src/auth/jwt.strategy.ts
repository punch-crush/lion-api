import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService) {
		const secretKey = configService.get<string>('jwt.secretKey');
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: secretKey,
		});
	}

	async validate(payload: any) {
		return { _id: payload.sub, email: payload.email };
	}
}
