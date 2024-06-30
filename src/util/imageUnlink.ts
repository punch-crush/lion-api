import fs from 'fs';
import path from 'path';
import { BadRequestException } from '@nestjs/common';

export const imageUnlink = (filename: string) => {
	const filePath = path.join('./uploads', filename);
	fs.unlink(filePath, err => {
		if (err) {
			throw new BadRequestException('파일 삭제 실패하였습니다.');
		}
	});
};
