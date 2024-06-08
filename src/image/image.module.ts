import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './image.schema';

@Module({
	imports: [
		MulterModule.register({
			dest: './uploads',
		}),
		MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
	],
	controllers: [ImageController],
	providers: [ImageService],
	exports: [ImageService], // ImageService를 내보내는 것이 필요한 경우
})
export class ImageModule {}
