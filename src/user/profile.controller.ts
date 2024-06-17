import {
	Controller,
	Delete,
	Get,
	Headers,
	HttpException,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller()
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	//개인 프로필 조회
	@Get(':accountname')
	async getProfile(
		@Headers('Authorization') authHeader: string,
		@Param('accountname') accountname: string,
	) {
		try {
			const token = authHeader.split(' ')[1];
			if (!token) {
				throw new HttpException('권한이 없습니다.', HttpStatus.UNAUTHORIZED);
			}

			return await this.profileService.getProfile(accountname);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	//팔로우
	@Post(':accountname/follow')
	async follow() {}

	@Delete(':accountname/unfollow')
	async unfollow() {}

	@Get(':accountname/following?limit=Number&skip=Number')
	async getFollowingList() {}

	@Get(':accountname/follower/?limit=Number&skip=Number')
	async getFollowerList() {}
}
