// library
import { ApiProperty } from '@nestjs/swagger';
import { UserRolesEnum } from 'src/users/user.constants';
import { UserRole } from 'src/users/user.types';

export class SignUpResponseDto {
  @ApiProperty({ example: '785e6094-2f33-49a9-b015-25cd12dab20a' })
  id: string;

  @ApiProperty({ example: 'user', enum: UserRolesEnum })
  role: UserRole;

  @ApiProperty({ example: 'Morgan' })
  firstName: string;

  @ApiProperty({ example: 'Blackhand' })
  lastName: string;

  @ApiProperty({ example: 'w@email.com' })
  email: string;

  @ApiProperty({ example: 'Hello my name is Monty' })
  bio: string;

  @ApiProperty({ example: '2024-08-15T12:31:48.721Z' })
  updatedAt: Date;

  @ApiProperty({ example: '2024-08-15T12:31:48.721Z' })
  createdAt: Date;
}
