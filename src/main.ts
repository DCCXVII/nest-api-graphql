import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {NestExpressApplication} from '@nestjs/platform-express';

declare const module: any;


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATH,POST,DELETE,OPTIONS',
    credentials: true,
  });


  await app.listen(3000);

  if(module.hot){
    module.hot.accept();
    module.hot.dispose(()=>app.close());
  }
}
bootstrap();
