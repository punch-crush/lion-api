import { imageDTO } from '@image/image.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { imageUnlink } from '@util/imageUnlink';
import * as fs from 'fs';
import { Model } from 'mongoose';
import * as path from 'path';
import { Image, ImageDocument } from './image.schema';

@Injectable()
export class ImageService {
	constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) {}

	async uploadFile(file: Express.Multer.File): Promise<imageDTO> {
		if (!file) {
			throw new BadRequestException('파일이 없습니다.');
		}

		const imageDocument = new this.imageModel({
			filename: file.filename,
		});
		await imageDocument.save();

		return file;
	}

	async uploadFiles(files: Array<Express.Multer.File>): Promise<imageDTO[]> {
		if (!files || files.length === 0) {
			throw new BadRequestException('파일이 없습니다.');
		}

		for (const file of files) {
			const imageDocument = new this.imageModel({
				filename: file.filename,
			});
			await imageDocument.save();
		}

		const mergeFileDetails = (files: Array<Express.Multer.File>) => {
			return files.reduce((acc, file, index) => {
				Object.keys(file).forEach(key => {
					if (index === 0) {
						acc[key] = file[key];
					} else {
						if (key !== 'fieldname' && key !== 'destination') {
							acc[key] += ',' + file[key];
						}
					}
				});
				return acc;
			}, {} as imageDTO);
		};

		const images = mergeFileDetails(files);

		return [images];
	}

	async deleteImage(filename: string): Promise<void> {
		const directory = fs.existsSync('./uploads');
		if (!directory) {
			throw new BadRequestException('uploads 폴더가 없습니다');
		}

		let filenameArr = [];
		if (filename.startsWith(process.env.API_HOST)) {
			const url = new URL(filename);
			filenameArr.push(path.basename(url.pathname));
		} else {
			filenameArr = filename.split(',').map(file => file.trim());
		}

		if (filename.startsWith(process.env.API_HOST)) {
			for (const file of filenameArr) {
				await this.imageModel.deleteOne({ filename: file });
				imageUnlink(file);
			}
		}
	}
}
