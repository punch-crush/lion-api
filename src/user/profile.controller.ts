import {
	BadRequestException,
	Controller,
	Delete,
	Get,
	Header,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '@user/auth/guards/jwt-auth.guard';
import { FollowResponseDto, InfoResponseDto } from './dto/profile.dto';
import { HandleErrors } from '@util/error-decorator';

@Controller()
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Get(':accountname')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async getProfile(
		@Req() req,
		@Param('accountname') accountname: string,
	): Promise<InfoResponseDto> {
		return await this.profileService.getProfile(req.user._id, accountname);
	}

	@Post(':accountname/follow')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async follow(
		@Req() req,
		@Param('accountname') accountname: string,
	): Promise<FollowResponseDto> {
		if (req.user._id == accountname) {
			throw new BadRequestException('자기 자신을 팔로우 할 수 없습니다.');
		}
		return await this.profileService.follow(req.user._id, accountname);
	}

	@Delete(':accountname/unfollow')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async unfollow(
		@Req() req,
		@Param('accountname') accountname: string,
	): Promise<FollowResponseDto> {
		if (req.user._id == accountname) {
			throw new BadRequestException('자기 자신을 언팔로우 할 수 없습니다.');
		}
		return await this.profileService.unfollow(req.user._id, accountname);
	}

	@Get(':accountname/following')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async getFollowingList(
		@Req() req,
		@Param('accountname') accountname: string,
		@Query('limit') limit: string,
		@Query('skip') skip: string,
	): Promise<FollowResponseDto[]> {
		const limitValue = limit ? parseInt(limit) : 10;
		const skipValue = skip ? parseInt(skip) : 0;

		return await this.profileService.getFollowingList(
			req.user._id,
			accountname,
			limitValue,
			skipValue,
		);
	}

	@Get(':accountname/follower')
	@Header('content-type', 'application/json')
	@UseGuards(JwtAuthGuard)
	@HandleErrors()
	async getFollowerList(
		@Req() req,
		@Param('accountname') accountname: string,
		@Query('limit') limit: string,
		@Query('skip') skip: string,
	): Promise<FollowResponseDto[]> {
		const limitValue = limit ? parseInt(limit) : 10;
		const skipValue = skip ? parseInt(skip) : 0;

		return await this.profileService.getFollowerList(
			req.user._id,
			accountname,
			limitValue,
			skipValue,
		);
	}
}
