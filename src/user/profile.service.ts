import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async getProfile(accountname: string) {
		const user = await this.userModel.findOne({ accountname });
		if (!user) {
			throw new HttpException('해당 계정이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
		}
		return {
			profile: user.readOnlyDataWithFollow,
		};
	}
}
