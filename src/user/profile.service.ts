import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FollowResponseDto, InfoResponseDto } from './dto/profile.dto';
import { getIsFollow } from 'src/util/helper';
import { UserService } from '@user/user.service';

@Injectable()
export class ProfileService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private userService: UserService,
	) {}

	async getProfile(_id: string, accountname: string): Promise<InfoResponseDto> {
		const user = await this.userService.getUserByAccountNameResponse(accountname, _id);
		return {
			profile: user,
		};
	}

	async follow(_id: string, accountname: string): Promise<FollowResponseDto> {
		const user = await this.userService.getUserByAccountName(accountname);
		const myProfile = await this.userService.getUserById(_id);

		if (!user.follower.includes(_id)) {
			user.follower.push(_id);
			await user.save();
		}
		if (!myProfile.following.includes(user._id.toString())) {
			myProfile.following.push(user._id.toString());
			await myProfile.save();
		}

		const userProfile = user.readOnlyData;
		userProfile.isfollow = getIsFollow(user, _id);
		return {
			profile: userProfile,
		};
	}

	async unfollow(_id: string, accountname: string): Promise<FollowResponseDto> {
		const user = await this.userService.getUserByAccountName(accountname);
		const myProfile = await this.userService.getUserById(_id);

		user.follower = user.follower.filter(id => id !== _id);
		await user.save();
		myProfile.following = myProfile.following.filter(id => id !== user._id.toString());
		await myProfile.save();

		return {
			profile: user.readOnlyData,
		};
	}

	async getFollowingList(
		_id: string,
		accountname: string,
		limit: number,
		skip: number,
	): Promise<FollowResponseDto[]> {
		const user = await this.userService.getUserByAccountName(accountname);
		const slicedFollowing = user.following.slice(skip, skip + limit);

		const followingList = [];
		for (const userId of slicedFollowing) {
			const followingDoc = await this.userModel.findById(userId);
			const following = followingDoc.readOnlyData;
			following.isfollow = getIsFollow(followingDoc, _id);
			followingList.push(following);
		}
		return followingList;
	}

	async getFollowerList(
		_id: string,
		accountname: string,
		limit: number,
		skip: number,
	): Promise<FollowResponseDto[]> {
		const user = await this.userService.getUserByAccountName(accountname);
		const slicedFollower = user.follower.slice(skip, skip + limit);

		const followerList = [];
		for (const userId of slicedFollower) {
			const followerDoc = await this.userModel.findById(userId);
			const follower = followerDoc.readOnlyData;
			follower.isfollow = getIsFollow(followerDoc, _id);
			followerList.push(follower);
		}
		return followerList;
	}
}
