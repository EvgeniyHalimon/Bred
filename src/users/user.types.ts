// constants
import { UserRolesEnum } from './user.constants';

// dto
import { PatchUserDto } from './dto';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  bio: string;
  role: UserRole;
  photo: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole =
  | UserRolesEnum.USER
  | UserRolesEnum.ADMIN
  | UserRolesEnum.SUPER_ADMIN;

export interface CustomFileTypeValidatorOptions {
  fileType: string | RegExp;
  message?: string;
}

export interface UpdateUserWithFile extends Partial<PatchUserDto> {
  photo: string | null;
}
