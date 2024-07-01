import { UserInfoCommon } from '@user/dto/user-base.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class ProfileCommon {
	@ValidateNested()
	@Type(() => UserInfoCommon)
	profile: UserInfoCommon;
}

export class InfoResponseDto extends ProfileCommon {}
export class FollowResponseDto extends ProfileCommon {}
