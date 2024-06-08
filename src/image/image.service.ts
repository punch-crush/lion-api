import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ImageService {
	uploadFiles(files: Array<Express.Multer.File>) {
		if (!files || files.length === 0) {
			throw new BadRequestException('파일이 없습니다.');
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
}

/*TODO
 * response 값을 mongoose 모델로 변환하는 로직, mongoose에 저장 로직 추가
 */
