import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsBoolean()
  readonly isActive: boolean;
}
