import { config } from '../../config';
import { IUser } from 'src/users/user.types';
import jwt from 'jsonwebtoken';
import { ITokens } from '../auth.types';

export const generateTokens = (user: Partial<IUser>): ITokens => {
  const accessToken = jwt.sign(
    {
      user,
    },
    config.SECRET,
    { expiresIn: config.EXPIRES_IN },
  );
  const refreshToken = jwt.sign(
    {
      user,
    },
    config.REFRESH_KEY as string,
    { expiresIn: config.EXPIRES_IN_REFRESH },
  );
  return { accessToken, refreshToken };
};
