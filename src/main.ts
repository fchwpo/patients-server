import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationError } from 'class-validator';
import { json } from 'express';
require('./config/env-loader');
import { AppModule } from './app.module';
import { ValidationException } from './filters/validation.exception';
import { ValidationFilter } from './filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3015;
  app.use(json({ limit: '512kb' }));
  // global handling of errors
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      exceptionFactory: (erros: ValidationError[]) => {
        console.log('inside exception');
        const errMsgs = erros.map(
          (err) =>
            `${err.property} has wrong value ${err.value}, ${Object.values(
              err.constraints,
            ).join(', ')}`,
        );
        console.log(errMsgs.join('\n'));
        return new ValidationException(errMsgs);
      },
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(port, () => {
    console.log('Patients Server Listening on', port);
  });
}
bootstrap();
