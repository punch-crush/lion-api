import { PostModule } from '@post/post.module';
import { AppModule } from './app.module';
import { ImageModule } from '@image/image.module';

export const routes = [
	{
		path: '/',
		module: AppModule,
		children: [
			{ path: '/image', module: ImageModule },
			{ path: '/post', module: PostModule },
		],
	},
];
