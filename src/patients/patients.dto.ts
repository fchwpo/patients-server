import { Validate } from 'class-validator';

export class GetAllPatientsDTO {
  sortBy: object;
  pageSize: number;
  pageNo: number;
}
