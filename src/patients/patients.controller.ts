import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PatientsService } from './patients.service';
import { diskStorage } from 'multer';
import * as fs from 'fs-extra';
import { getFileName, getFilePath, validFileFilter } from './patients.util';

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
    return {
      isSuccess: true,
    };
  }
}
