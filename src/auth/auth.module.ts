import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from './test/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import dotenv from 'dotenv';

dotenv.config();

@Module({
	imports: [UsersModule, PassportModule],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy],
	exports: [AuthService],
})
export class AuthModule {}
