import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './registerUser.dto';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async register(user: RegisterUserDTO) {
		const { email, accountname, password } = user.user;
		const isEmailExist = await this.userModel.exists({ user: { email } });
		const isAccountNameExist = await this.userModel.exists({ user: { accountname } });
		if (isEmailExist || isAccountNameExist) {
			throw new HttpException(
				'이미 가입된 이메일 주소 또는 계정ID 입니다.',
				HttpStatus.BAD_REQUEST,
			);
		}

		const hashedPassword = await await bcrypt.hash(password, 10);
		const newUser = await this.userModel.create({
			...user,
			password: hashedPassword,
		});
		return {
			message: '회원가입 성공',
			user: newUser.readOnlyData,
		};
	}

	async validateEmail(email: string) {
		const isEmailExist = await this.userModel.exists({ user: { email } });
		if (isEmailExist) {
			throw new HttpException('이미 가입된 이메일 주소 입니다.', HttpStatus.BAD_REQUEST);
		}
		return { message: '사용 가능한 이메일 입니다.' };
	}

	async validateAccountName(accountname: string) {
		const isAccountNameExist = await this.userModel.exists({ user: { accountname } });
		if (isAccountNameExist) {
			throw new HttpException('이미 가입된 계정ID 입니다.', HttpStatus.BAD_REQUEST);
		}
		return { message: '사용 가능한 계정ID 입니다.' };
	}
}
