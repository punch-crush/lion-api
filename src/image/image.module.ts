import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [
		MulterModule.register({
			dest: './uploads',
		}),
	],
	controllers: [ImageController],
	providers: [ImageService],
})
export class ImageModule {}
