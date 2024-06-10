import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateProfileService } from './updateProfile.service';
import { UpdateProfileController } from './updateProfile.controller';
import { User, UserSchema } from './user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: User.name, schema: UserSchema, collection: 'user' },
		]),
	],
	providers: [UpdateProfileService],
	controllers: [UpdateProfileController],
})
export class UpdateProfileModule {}
