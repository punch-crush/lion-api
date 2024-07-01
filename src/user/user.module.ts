import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema, { User } from './user.schema';
import { ImageModule } from '@image/image.module';

@Global()
@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		ImageModule,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [
		UserService,
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
})
export class UserModule {}
