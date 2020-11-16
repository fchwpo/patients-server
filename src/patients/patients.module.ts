import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PatientsInfoRepo } from './PatientsInfo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PatientsInfoRepo])],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
