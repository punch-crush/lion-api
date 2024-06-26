import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './image.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {
	constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) {}

	async uploadFile(file: Express.Multer.File) {
		if (!file) {
			throw new BadRequestException('파일이 없습니다.');
		}

		const imageDocument = new this.imageModel({
			filename: file.filename,
		});
		await imageDocument.save();

		return file;
	}

	async uploadFiles(files: Array<Express.Multer.File>) {
		if (!files || files.length === 0) {
			throw new BadRequestException('파일이 없습니다.');
		}

		// mongodb image collection에 저장
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
			}, {});
		};

		const images = mergeFileDetails(files);

		return images;
	}

	async deleteImage(filename: string): Promise<void> {
		const filePath = path.join('./uploads', filename);
		fs.unlink(filePath, err => {
			if (err) {
				throw new Error('파일 삭제 실패');
			}
		});
	}
}
