import {
	BadRequestException,
	Controller,
	Delete,
	Get,
	Header,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { FollowResponseDto, InfoResponseDto } from './dto/profile.dto';

@Controller()
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Get(':accountname')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getProfile(@Param('accountname') accountname: string): Promise<InfoResponseDto> {
		try {
			return await this.profileService.getProfile(accountname);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Post(':accountname/follow')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async follow(
		@Req() req,
		@Param('accountname') accountname: string,
	): Promise<FollowResponseDto> {
		try {
			if (req.user._id == accountname) {
				throw new BadRequestException('자기 자신을 팔로우 할 수 없습니다.');
			}

			return await this.profileService.follow(req.user._id, accountname);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Delete(':accountname/unfollow')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async unfollow(
		@Req() req,
		@Param('accountname') accountname: string,
	): Promise<FollowResponseDto> {
		try {
			if (req.user._id == accountname) {
				throw new BadRequestException('자기 자신을 언팔로우 할 수 없습니다.');
			}

			return await this.profileService.unfollow(req.user._id, accountname);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Get(':accountname/following')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getFollowingList(
		@Req() req,
		@Param('accountname') accountname: string,
		@Query('limit') limit: string,
		@Query('skip') skip: string,
	): Promise<FollowResponseDto[]> {
		try {
			const limitValue = limit ? parseInt(limit) : 10;
			const skipValue = skip ? parseInt(skip) : 0;

			return await this.profileService.getFollowingList(
				req.user._id,
				accountname,
				limitValue,
				skipValue,
			);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Get(':accountname/follower')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	async getFollowerList(
		@Req() req,
		@Param('accountname') accountname: string,
		@Query('limit') limit: string,
		@Query('skip') skip: string,
	): Promise<FollowResponseDto[]> {
		try {
			const limitValue = limit ? parseInt(limit) : 10;
			const skipValue = skip ? parseInt(skip) : 0;

			return await this.profileService.getFollowerList(
				req.user._id,
				accountname,
				limitValue,
				skipValue,
			);
		} catch (error) {
			if (error instanceof HttpException) {
				throw error;
			} else {
				throw new HttpException('잘못된 접근입니다.', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
