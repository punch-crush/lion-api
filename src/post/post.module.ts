import { Global, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import PostSchema, { Post } from './post.schema';

@Global()
@Module({
	imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
	controllers: [PostController],
	providers: [PostService],
	exports: [PostService],
})
export class PostModule {}
