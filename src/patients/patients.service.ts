import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as xlsx from 'xlsx';
import * as csvtojson from 'csvtojson';
import { GetAllPatientsDTO } from './patients.dto';
import { isExcelFile, isValidRowInfo } from './patients.util';
import { PatientsInfoRepo } from './PatientsInfo.repository';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientsInfoRepo)
    private readonly patientsInfoRepo: PatientsInfoRepo,
  ) {}

  async test() {
    return 'Hello World';
  }

  private formatPatientsExcelData(data: any[]) {
    const patientsData = [];
    const rowInfo = data.shift().map((cur: string) => cur.toLowerCase());
    data.forEach((curPatient) => {
      // if valid then push
      const formattedCurData = {};
      rowInfo.forEach((curRow: string, index: number) => {
        formattedCurData[curRow] = curPatient[index];
      });
      if (isValidRowInfo(formattedCurData)) {
        patientsData.push(formattedCurData);
      }
    });
    return patientsData;
  }

  private async extractDataFromExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const data = xlsx.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[0]],
      {
        header: 1,
        blankrows: false,
        defval: null,
      },
    );
    return this.formatPatientsExcelData(data);
  }

  private async extractDataFromCSVFile(filePath) {
    const data = await csvtojson().fromFile(filePath);
    const patientsData = [];
    data.forEach((cur) => {
      const patient = {};
      Object.keys(cur).forEach((key) => {
        patient[key.toLowerCase()] = cur[key];
      });
      if (isValidRowInfo(patient)) {
        patientsData.push(patient);
      }
    });
    return patientsData;
  }

  private async extractDataFromFile(file) {
    if (isExcelFile(file.mimetype)) {
      return this.extractDataFromExcelFile(file.path);
    } else {
      return this.extractDataFromCSVFile(file.path);
    }
  }

  async add(file: any) {
    const patientsData = await this.extractDataFromFile(file);
    return this.patientsInfoRepo.addPatientsInfo(patientsData);
  }

  async getAll(options: GetAllPatientsDTO) {
    return this.patientsInfoRepo.getAll(options);
  }

  async getById(id: number) {
    return this.patientsInfoRepo.findOne(id);
  }
}
