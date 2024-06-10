import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UpdateProfileModule } from '@user/updateProfile.module';
// import { ImageModule } from '@image/image.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRoot(process.env.DB_URL),
		UpdateProfileModule,
		// ImageModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
