import { Global, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import PostSchema, { Post } from './post.schema';
import { UserModule } from '@user/user.module';
import { Comment, CommentSchema } from './comment/comment.schema';
import { CommentService } from './comment/comment.service';

@Global()
@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Post.name, schema: PostSchema },
			{ name: Comment.name, schema: CommentSchema },
		]),
		UserModule,
	],
	controllers: [PostController],
	providers: [PostService, CommentService],
})
export class PostModule {}
