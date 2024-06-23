import { UserDocument } from '@user/user.schema';

export const getIsFollow = (user: UserDocument, currUserId: string) => {
	const userProfile = user.readOnlyData;
	return userProfile.follower.includes(currUserId);
};
