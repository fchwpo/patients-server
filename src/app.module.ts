import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import dbConfig from './config/db-config';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    PatientsModule,
    HttpModule,
    TypeOrmModule.forRoot(dbConfig.default),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
