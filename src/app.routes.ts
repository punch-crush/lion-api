import { PostModule } from '@post/post.module';
import { AppModule } from './app.module';
import { ImageModule } from '@image/image.module';
import { ProductModule } from '@product/product.module';

export const routes = [
	{
		path: '/',
		module: AppModule,
		children: [
			{ path: '/image', module: ImageModule },
			{ path: '/product', module: ProductModule },
			{ path: '/post', module: PostModule },
		],
	},
];
