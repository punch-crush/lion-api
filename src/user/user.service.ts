import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
	ProfileResponseDto,
	ProfileUpdateRequestDto,
	RegisterRequestDto,
} from './dto/user.dto';
import { ProfileResponse } from './dto/user-base.dto';
import { getIsFollow } from 'src/util/helper';
import { ImageService } from '@image/image.service';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private imageService: ImageService,
	) {}

	async getUserById(userId: string): Promise<UserDocument> {
		const user = await this.userModel.findById(userId);
		if (!user) {
			throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
		}
		return user;
	}

	async getUserByIdResponse(
		userId: string,
		currUserId: string,
	): Promise<ProfileResponse> {
		const user = await this.getUserById(userId);
		return {
			...user.readOnlyData,
			isfollow: getIsFollow(user, currUserId),
		};
	}

	async getUserByAccountName(accountname: string): Promise<UserDocument> {
		const user = await this.userModel.findOne({ accountname });
		if (!user) {
			throw new HttpException('해당 계정이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
		}
		return user;
	}

	async getUserByAccountNameResponse(
		accountname: string,
		currUserId: string,
	): Promise<ProfileResponse> {
		const user = await this.getUserByAccountName(accountname);
		return {
			...user.readOnlyData,
			isfollow: getIsFollow(user, currUserId),
		};
	}

	async register(user: RegisterRequestDto) {
		const { email, accountname, username, password } = user.user;
		if (!email || !accountname || !username || !password) {
			throw new HttpException('필수 입력사항을 입력해주세요.', HttpStatus.BAD_REQUEST);
		}
		const isEmailExist = await this.userModel.exists({ email });
		if (isEmailExist) {
			throw new HttpException('이미 가입된 이메일 주소 입니다.', HttpStatus.BAD_REQUEST);
		}
		const isAccountNameExist = await this.userModel.exists({ accountname });
		if (isAccountNameExist) {
			throw new HttpException('이미 가입된 계정ID 입니다.', HttpStatus.BAD_REQUEST);
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await this.userModel.create({
			...user.user,
			password: hashedPassword,
		});
		return {
			message: '회원가입 성공',
			user: newUser.registerData,
		};
	}

	async validateEmail(email: string) {
		const isEmailExist = await this.userModel.exists({ email });
		if (isEmailExist) {
			throw new HttpException('이미 가입된 이메일 주소 입니다.', HttpStatus.BAD_REQUEST);
		}
		return { message: '사용 가능한 이메일 입니다.' };
	}

	async validateAccountName(accountname: string) {
		const isAccountNameExist = await this.userModel.exists({ accountname });
		if (isAccountNameExist) {
			throw new HttpException('이미 가입된 계정ID 입니다.', HttpStatus.BAD_REQUEST);
		}
		return { message: '사용 가능한 계정ID 입니다.' };
	}

	async validateLogin(email: string, password: string) {
		const user: User = await this.userModel.findOne({ email });
		if (!user) {
			throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new HttpException('비밀번호가 일치하지 않습니다.', HttpStatus.UNAUTHORIZED);
		}
		const { intro, ...userData } = user.registerData;
		void intro;
		return userData;
	}

	async getMyInfo(_id: string): Promise<ProfileResponseDto> {
		const user = await this.getUserById(_id);
		return {
			user: user.readOnlyData,
		};
	}

	async updateProfile(
		_id: string,
		newUserInfo: ProfileUpdateRequestDto,
	): Promise<ProfileResponseDto> {
		const { username, accountname, intro, image } = newUserInfo.user;
		if (!accountname || !username) {
			throw new HttpException('필수 입력사항을 입력해주세요.', HttpStatus.BAD_REQUEST);
		}

		const user = await this.getUserById(_id);
		if (user.accountname !== accountname) {
			const isAccountNameExist = await this.userModel.exists({ accountname });
			if (isAccountNameExist) {
				throw new HttpException('이미 가입된 계정ID 입니다.', HttpStatus.BAD_REQUEST);
			}
		}

		if (user.image && user.image !== image) {
			await this.imageService.deleteImage(user.image);
		}

		user.username = username;
		user.accountname = accountname;
		user.intro = intro;
		user.image = image;

		await user.save();

		return {
			user: user.readOnlyData,
		};
	}

	async searchUsers(keyword: string, userId: string) {
		const users = await this.userModel
			.find({
				$or: [
					{ username: { $regex: keyword, $options: 'i' } },
					{ accountname: { $regex: keyword, $options: 'i' } },
				],
			})
			.select('_id username image accountname following follower')
			.lean()
			.exec();
		if (!users || users.length === 0) {
			return [];
		}
		const newUsers = users
			.filter(user => user._id.toString() !== userId)
			.map(user => {
				return {
					...user,
					followerCount: user.follower.length,
					followingCount: user.following.length,
				};
			});

		return newUsers;
	}
}
