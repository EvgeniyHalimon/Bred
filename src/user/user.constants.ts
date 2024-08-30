export enum UserRolesEnum {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export const userFieldLengths = {
  firstName: {
    max: 200,
  },
  lastName: {
    max: 200,
  },
  password: {
    min: 16,
  },
  bio: {
    min: 20,
    max: 3000,
  },
};
