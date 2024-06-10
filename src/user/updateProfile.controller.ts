import { Controller, Put, Body, Headers } from '@nestjs/common';
import { UpdateProfileService } from './updateProfile.service';

@Controller('/user')
export class UpdateProfileController {
	constructor(private readonly updateProfileService: UpdateProfileService) {}

	@Put()
	async updateProfile(
		@Headers('Authorization') authHeader: string,
		@Body('user')
		userData: { username: string; accountname: string; intro: string; image: string },
	): Promise<string> {
		try {
			console.log('요청 확인');
			const { username, accountname, intro, image } = userData;
			const updatedUser = await this.updateProfileService.updateProfile(
				authHeader,
				username,
				accountname,
				intro,
				image,
			);
			console.log(updatedUser);
			return '프로필 업데이트 성공';
		} catch (error) {
			throw error;
		}
	}
}
