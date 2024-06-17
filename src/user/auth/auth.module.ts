import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '@user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: process.env.JWT_SECRET,
				signOptions: { expiresIn: '30m' },
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
