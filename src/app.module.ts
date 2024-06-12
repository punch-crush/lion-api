import { Module, ValidationPipe } from '@nestjs/common';
import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from '@image/image.module';
import { APP_PIPE, RouterModule } from '@nestjs/core';
import { routes } from './app.routes';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			cache: true,
		}),
		MongooseModule.forRoot(process.env.DB_URL),
		RouterModule.register(routes),
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
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
})
export class AppModule {}
