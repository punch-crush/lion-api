import { ProfileModule } from '@user/profile.module';
import { AppModule } from './app.module';
import { ImageModule } from '@image/image.module';
import { ProductModule } from '@product/product.module';
import { UserModule } from '@user/user.module';
import { PostModule } from '@post/post.module';

export const routes = [
	{
		path: '/',
		module: AppModule,
		children: [
			{ path: '/image', module: ImageModule },
			{ path: '/product', module: ProductModule },
			{ path: '/post', module: PostModule },
			{ path: '/user', module: UserModule },
			{ path: '/profile', module: ProfileModule },
		],
	},
];
