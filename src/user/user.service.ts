import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { RegisterRequestDto } from './dto/user.dto';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async register(user: RegisterRequestDto) {
		const { email, accountname, username, password } = user.user;
		if (!email || !accountname || !username || !password) {
			throw new HttpException('필수 입력사항을 입력해주세요.', HttpStatus.BAD_REQUEST);
		}
		const isEmailExist = await this.userModel.exists({ email });
		if (isEmailExist) {
			throw new HttpException('이미 가입된 이메일 주소 입니다.', HttpStatus.BAD_REQUEST);
		}
		const isAccountNameExist = await this.userModel.exists({ accountname });
		if (isAccountNameExist) {
			throw new HttpException('이미 가입된 계정ID 입니다.', HttpStatus.BAD_REQUEST);
		}

		const hashedPassword = await await bcrypt.hash(password, 10);
		const newUser = await this.userModel.create({
			...user.user,
			password: hashedPassword,
		});
		return {
			message: '회원가입 성공',
			user: newUser.readOnlyData,
		};
	}

	async validateEmail(email: string) {
		const isEmailExist = await this.userModel.exists({ email });
		if (isEmailExist) {
			throw new HttpException('이미 가입된 이메일 주소 입니다.', HttpStatus.BAD_REQUEST);
		}
		return { message: '사용 가능한 이메일 입니다.' };
	}

	async validateAccountName(accountname: string) {
		const isAccountNameExist = await this.userModel.exists({ accountname });
		if (isAccountNameExist) {
			throw new HttpException('이미 가입된 계정ID 입니다.', HttpStatus.BAD_REQUEST);
		}
		return { message: '사용 가능한 계정ID 입니다.' };
	}
  
	async findUser(email: string, password: string) {
		const user = await this.userModel.findOne({ email });
		if (!user) {
			throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new HttpException('비밀번호가 일치하지 않습니다.', HttpStatus.UNAUTHORIZED);
		}
		return { _id: user._id, email: user.email };
	}
}
