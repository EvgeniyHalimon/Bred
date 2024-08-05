import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  HOST: process.env.HOST || '',
  PORT: process.env.PORT || 3003,
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  DATABASE: process.env.DATABASE || '',
  SECRET: process.env.SECRET || '',
  EXPIRES_IN: process.env.EXPIRES_IN || '1h',
};
