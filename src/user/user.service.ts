import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './registerUser.dto';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

// https://velog.io/@bin-lee/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%A1%9C%EC%A7%81-%EA%B8%B0%EB%A1%9D-NestJS
@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async register(user: RegisterUserDTO) {
		const hashedPassword = await await bcrypt.hash(user.password, 10);
		const newUser = await this.userModel.create({
			...user,
			password: hashedPassword,
		});
		return newUser;
	}

	async validateEmail(email: string) {
		const isEmailExist = await this.userModel.exists({ user: { email } });
		if (isEmailExist) {
			throw new HttpException('이미 가입된 이메일 주소 입니다.', HttpStatus.BAD_REQUEST);
		}
		return { message: '사용 가능한 이메일 입니다.' };
	}

	async validateAccountName(accountname: string) {
		const isAccountExist = await this.userModel.exists({ user: { accountname } });
		if (isAccountExist) {
			throw new HttpException('이미 가입된 계정ID 입니다.', HttpStatus.BAD_REQUEST);
		}
		return { message: '사용 가능한 계정ID 입니다.' };
	}
}
