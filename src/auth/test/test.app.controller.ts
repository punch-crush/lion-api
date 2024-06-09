// import { Controller, Get, UseGuards, Request } from '@nestjs/common';
// import { AppService } from './app.service';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

// @Controller()
// export class AppController {
// 	constructor(private readonly appService: AppService) {}

// 	@UseGuards(JwtAuthGuard)
// 	@Get('profile')
// 	getProfile(@Request() req) {
// 		return req.user;
// 	}

// 	@Get()
// 	getHello(): string {
// 		return this.appService.getHello();
// 	}
// }
