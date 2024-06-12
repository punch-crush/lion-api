import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 8000;
	await app.listen(port);
	app.useGlobalPipes(
		new ValidationPipe(),
		// 	{
		// 	whitelist: true,
		// 	transform: true,
		// 	transformOptions: {
		// 		enableImplicitConversion: true,
		// 	}
		// }
	);

	console.log(`listening on port ${port}`);
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
