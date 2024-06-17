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
	async follow(
		@Headers('Authorization') authHeader: string,
		@Param('accountname') accountname: string,
	) {
		try {
			const token = authHeader.split(' ')[1];
			if (!token) {
				throw new HttpException('권한이 없습니다.', HttpStatus.UNAUTHORIZED);
			}
			const myAccountName = 'newChar'; //토큰 이용해 알아온다.

			if (accountname == myAccountName) {
				throw new HttpException(
					'자기 자신을 팔로우 할 수 없습니다.',
					HttpStatus.INTERNAL_SERVER_ERROR,
				);
			}

			return await this.profileService.follow(myAccountName, accountname);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	//언팔로우
	@Delete(':accountname/unfollow')
	async unfollow(
		@Headers('Authorization') authHeader: string,
		@Param('accountname') accountname: string,
	) {
		try {
			const token = authHeader.split(' ')[1];
			if (!token) {
				throw new HttpException('권한이 없습니다.', HttpStatus.UNAUTHORIZED);
			}
			const myAccountName = 'newChar'; //토큰 이용해 알아온다.

			if (accountname == myAccountName) {
				throw new HttpException(
					'자기 자신을 언팔로우 할 수 없습니다.',
					HttpStatus.INTERNAL_SERVER_ERROR,
				);
			}

			return await this.profileService.unfollow(myAccountName, accountname);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	//팔로잉 리스트
	@Get(':accountname/following?limit=Number&skip=Number')
	async getFollowingList() {}

	//팔로워 리스트
	@Get(':accountname/follower/?limit=Number&skip=Number')
	async getFollowerList() {}
}
