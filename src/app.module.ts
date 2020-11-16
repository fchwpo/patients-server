require('./config/env-loader');
import { HttpModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from './config/db-config';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    PatientsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'build'),
      exclude: ['/api*'],
    }),
    HttpModule,
    TypeOrmModule.forRoot(dbConfig.default),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
