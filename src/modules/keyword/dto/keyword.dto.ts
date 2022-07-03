import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class KeywordDto {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}

export class UpdateKeywordDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  keyword: string;
}
