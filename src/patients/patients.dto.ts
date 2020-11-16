import { IsNumber, IsPositive, Validate } from 'class-validator';

export class GetAllPatientsDTO {
  sortBy: object;

  @IsNumber()
  @IsPositive()
  pageSize: number;

  @IsNumber()
  @IsPositive()
  pageNo: number;
}
