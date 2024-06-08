import {
	Controller,
	Post,
	UploadedFiles,
	UseInterceptors,
	Get,
	Param,
	Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '@config/multer.config';
import { ImageService } from './image.service';
import { Response } from 'express';

@Controller('image')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Post('uploadfile')
	@UseInterceptors(FilesInterceptor('files', 3, multerConfig))
	uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
		return this.imageService.uploadFiles(files);
	}

	@Get('uploads/:filename')
	async getImage(@Param('filename') filename: string, @Res() res: Response) {
		res.sendFile(filename, { root: 'uploads' });
	}
}
