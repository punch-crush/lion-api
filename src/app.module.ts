import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from '@image/image.module';
import { APP_PIPE, RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { UserModule } from '@user/user.module';
import { AuthModule } from './user/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
		}),
		MongooseModule.forRoot(process.env.DB_URL),
		RouterModule.register(routes),
		UserModule,
		ImageModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
})
export class AppModule {}
