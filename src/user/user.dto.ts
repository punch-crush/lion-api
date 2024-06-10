import { KeyObject } from 'crypto';

export interface User {
	readonly _id: KeyObject;
	email: string;
	password: string;
	username: string;
	accountname: string;
	intro: string;
	hearts: string[];
	isfollow: boolean;
	follower: string[];
	following: string[];
	followerCount: number;
	followingCount: number;
	image: string;
	readonly token: string;
}

export type UserSignUpRes = Pick<
	User,
	'_id' | 'email' | 'username' | 'accountname' | 'intro' | 'image'
>;

export type UserLoginRes = Pick<
	User,
	'_id' | 'email' | 'username' | 'accountname' | 'image' | 'token'
>;

// get my profile , update my profile res
export type UserMyProfileRes = Pick<
	User,
	| '_id'
	| 'username'
	| 'accountname'
	| 'intro'
	| 'image'
	| 'follower'
	| 'following'
	| 'followerCount'
	| 'followingCount'
>;

// get tother profile res, follow res, unfollow res, following list, follower list
export type UserOtherProfileRes = Pick<
	User,
	| '_id'
	| 'username'
	| 'accountname'
	| 'intro'
	| 'image'
	| 'isfollow'
	| 'following'
	| 'follower'
	| 'followerCount'
	| 'followingCount'
>;

export type SearchRes = Pick<
	User,
	| '_id'
	| 'username'
	| 'accountname'
	| 'following'
	| 'follower'
	| 'followerCount'
	| 'followingCount'
>;
