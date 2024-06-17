import { Global, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import PostSchema, { Post } from './post.schema';
import { UserModule } from '@user/user.module';

@Global()
@Module({
	imports: [
		MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
		UserModule,
	],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
