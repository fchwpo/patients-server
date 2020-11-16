import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { isExcelFile } from './patients.util';

@Injectable()
export class PatientsService {
  async test() {
    return 'Hello World';
  }

  private async extractDataFromExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const data = xlsx.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]],
      {
        header: 1,
      },
    );
    return data;
  }

  private async extractDataFromFile(file) {
    if (isExcelFile(file.mimetype)) {
      return this.extractDataFromExcelFile(file.path);
    }
  }

  async add(file) {
    const patientsData = await this.extractDataFromFile(file);
    return patientsData;
  }
}
