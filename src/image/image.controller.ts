import {
	Controller,
	Post,
	UploadedFiles,
	UploadedFile,
	UseInterceptors,
	Get,
	Param,
	Res,
} from '@nestjs/common';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@config/multer.config';
import { ImageService } from './image.service';
import { Response } from 'express';
import path from 'path';

@Controller()
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Post('uploadfile')
	@UseInterceptors(FileInterceptor('image', multerConfig))
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		return this.imageService.uploadFile(file);
	}

	@Post('uploadfiles')
	@UseInterceptors(FilesInterceptor('images', 3, multerConfig))
	uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
		return this.imageService.uploadFiles(files);
	}

	@Get('uploads/:filename')
	async getImage(@Param('filename') filename: string, @Res() res: Response) {
		const filePath = path.join('uploads', filename);
		res.sendFile(filePath, { root: '.' });
	}
}
