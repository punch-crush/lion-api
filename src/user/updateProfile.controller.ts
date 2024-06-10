import { Controller, Put, Body, Headers } from '@nestjs/common';
import { UpdateProfileService } from './updateProfile.service';
import { UserMyProfileRes } from './user.dto';

@Controller('/user')
export class UpdateProfileController {
	constructor(private readonly updateProfileService: UpdateProfileService) {}

	@Put()
	async updateProfile(
		@Headers('Authorization') authHeader: string,
		@Body('user')
		userData: { username: string; accountname: string; intro: string; image: string },
	): Promise<{ user: UserMyProfileRes }> {
		try {
			const { username, accountname, intro, image } = userData;
			const updatedUser = await this.updateProfileService.updateProfile(
				authHeader,
				username,
				accountname,
				intro,
				image,
			);
			return {
				user: {
					_id: updatedUser._id,
					username: updatedUser.username,
					accountname: updatedUser.accountname,
					intro: updatedUser.intro,
					image: updatedUser.image,
					following: updatedUser.following || [],
					follower: updatedUser.follower || [],
					followerCount: updatedUser.follower ? updatedUser.follower.length : 0,
					followingCount: updatedUser.following ? updatedUser.following.length : 0,
				},
			};
		} catch (error) {
			throw error;
		}
	}
}
