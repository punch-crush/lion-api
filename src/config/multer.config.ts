import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

export const multerConfig = {
	storage: diskStorage({
		destination: './uploads',
		filename: (_, file, cb) => {
			const filename: string = uuidv4();
			const extension: string = path.parse(file.originalname).ext; // 파일 확장자 설정
			cb(null, `${filename}${extension}`); // 파일 이름 설정
		},
	}),

	limits: {
		fileSize: 10 * 1024 * 1024, // 파일 크기 제한 (10MB)
		files: 3, // 최대 파일 수 제한
	},
	fileFilter: (_, file, cb) => {
		if (!file.originalname.match(/\.(jpg|gif|png|jpeg|bmp|tif|heic)$/)) {
			return cb(new Error('파일 확장자는 이미지 확장자만 허용됩니다.'), false);
		}
		cb(null, true);
	},
};
