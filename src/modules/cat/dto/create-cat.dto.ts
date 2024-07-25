import { IsNumber, IsString, Min } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;
  @Min(1)
  @IsNumber()
  readonly age: number;
  @IsString()
  readonly breed: string;
}
