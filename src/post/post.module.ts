import { Global, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import PostSchema, { Post } from './post.schema';
import { UserModule } from '@user/user.module';
import CommentSchema, { Comment } from './comment/comment.schema';
import { CommentService } from './comment/comment.service';
import { ImageModule } from '@image/image.module';

@Global()
@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Post.name, schema: PostSchema },
			{ name: Comment.name, schema: CommentSchema },
		]),
		UserModule,
		ImageModule,
	],
	controllers: [PostController],
	providers: [PostService, CommentService],
	exports: [PostService],
})
export class PostModule {}
