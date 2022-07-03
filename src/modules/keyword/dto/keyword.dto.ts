import { IsNotEmpty, IsString } from 'class-validator';

export class KeywordDto {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}
