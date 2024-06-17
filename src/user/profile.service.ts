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

	async follow(myAccountName: string, accountname: string) {
		const user = await this.userModel.findOne({ accountname });
		const myProfile = await this.userModel.findOne({ accountname: myAccountName });
		if (!user || !myProfile) {
			throw new HttpException('해당 계정이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
		}

		if (!user.follower.includes(myAccountName)) {
			user.follower.push(myAccountName);
			await user.save();
		}
		if (!myProfile.following.includes(accountname)) {
			myProfile.following.push(accountname);
			await myProfile.save();
		}

		const userProfile = user.readOnlyDataWithFollow;
		userProfile.isfollow = userProfile.follower.includes(myAccountName) ? true : false;
		return {
			profile: userProfile,
		};
	}

	async unfollow(myAccountName: string, accountname: string) {
		const user = await this.userModel.findOne({ accountname });
		const myProfile = await this.userModel.findOne({ accountname: myAccountName });
		if (!user || !myProfile) {
			throw new HttpException('해당 계정이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
		}

		if (user.follower.includes(myAccountName)) {
			user.follower = user.follower.filter(name => name !== myAccountName);
			await user.save();
		}
		if (myProfile.following.includes(accountname)) {
			myProfile.following = myProfile.following.filter(name => name !== accountname);
			await myProfile.save();
		}

		return {
			profile: user.readOnlyDataWithFollow,
		};
	}
}
