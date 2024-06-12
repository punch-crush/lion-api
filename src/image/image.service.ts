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

/*TODO
 * response 값을 mongoose 모델로 변환하는 로직, mongoose에 저장 로직 추가
 */

/**
 * 이전 이미지 삭제 사용방법 예시

async updateUserProfile(userId: string, newImageFilename: string): Promise<void> {
  const user = await this.userModel.findById(userId);
  if (user && user.image) {
    await this.imageService.deleteImage(user.image);
  }
  user.image = newImageFilename;
  await user.save();
}

=> user 모델에 추가
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ImageModule } from '../image/image.module'; // ImageModule import

@Module({
  imports: [ImageModule], // ImageModule을 UserModule에 추가
  providers: [UserService],
})
export class UserModule {}


=> user 서비스에 추가
import { Injectable } from '@nestjs/common';
import { ImageService } from '../image/image.service'; // ImageService import

@Injectable()
export class UserService {
  constructor(private imageService: ImageService) {} // ImageService 주입

  async updateUserProfile(userId: string, newImageFilename: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (user && user.image) {
      await this.imageService.deleteImage(user.image); // 이미지 삭제 로직 호출
    }
    user.image = newImageFilename;
    await user.save();
  }
}


 * 프로필 이미지를 변경하는 서비스 메소드에서 deleteImage 메소드를 호출하여 이전 이미지를 삭제하기
 * 사용자가 이미지를 변경할 때마다 서버에서 이전 이미지 파일을 삭제
 * 서버 공간 효율성 증가
*/
