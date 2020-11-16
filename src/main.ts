import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
require('./config/env-loader');
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3015;
  app.use(json({ limit: '512kb' }));
  await app.listen(port, () => {
    console.log('Patients Server Listening on', port);
  });
}
bootstrap();
