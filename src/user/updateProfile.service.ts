import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UpdateProfileService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async updateProfile(
		token: string,
		username: string,
		accountname: string,
		intro: string,
		image: string,
	): Promise<User> {
		const user = await this.userModel.findOne({ token });

		if (!user) {
			throw new HttpException('인증 토큰이 유효하지 않습니다.', HttpStatus.UNAUTHORIZED);
		}

		user.username = username;
		user.accountname = accountname;
		user.intro = intro;
		user.image = image;

		return user.save();
	}
}
