import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';

@Module({
	imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
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
