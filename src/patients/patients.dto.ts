import { IsNumber, IsObject, IsPositive, Validate } from 'class-validator';

export class GetAllPatientsDTO {
  @IsObject()
  sortBy: object;

  @IsNumber()
  @IsPositive()
  pageSize: number;

  @IsNumber()
  @IsPositive()
  pageNo: number;
}
