import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PatientsService } from './patients.service';
import { diskStorage } from 'multer';
import * as fs from 'fs-extra';
import { getFileName, getFilePath, validFileFilter } from './patients.util';
import { GetAllPatientsDTO } from './patients.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('test')
  async test() {
    return this.patientsService.test();
  }

  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const filePath = getFilePath();
          fs.mkdirsSync(filePath);
          cb(null, filePath);
        },
        filename: getFileName,
      }),
      fileFilter: validFileFilter,
    }),
  )
  async add(@UploadedFile() file) {
    console.log(file);
    const data = await this.patientsService.add(file);
    return {
      isSuccess: true,
      data,
    };
  }

  @Get('/')
  async getAll(@Body() options: GetAllPatientsDTO) {
    const data = await this.patientsService.getAll(options);
    return {
      isSuccess: true,
      data,
    };
  }

  @Get('/:id')
  async getById(@Param() id: number) {
    const data = await this.patientsService.getById(id);
    return {
      isSuccess: true,
      data,
    };
  }
}
