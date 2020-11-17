import { IsNumber, IsObject, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetAllPatientsDTO {
  @Transform(JSON.parse)
  @IsObject()
  sortBy: object;

  @Transform(Number)
  @IsNumber()
  @IsPositive()
  pageSize: number;

  @Transform(Number)
  @IsNumber()
  @IsPositive()
  pageNo: number;

  @IsString()
  searchKey: string;
}
