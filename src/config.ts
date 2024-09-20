// library
import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  HOST: process.env.HOST ?? '',
  DB_PORT: process.env.DB_PORT ?? 3003,
  SERVER_PORT: process.env.SERVER_PORT ?? 3001,
  DB_USERNAME: process.env.DB_USERNAME ?? '',
  PASSWORD: process.env.PASSWORD ?? '',
  DATABASE: process.env.DATABASE ?? '',
  SECRET_ACCESS: process.env.SECRET_ACCESS,
  SECRET_REFRESH: process.env.SECRET_REFRESH,
  EXPIRES_IN: process.env.EXPIRES_IN ?? '',
  EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH ?? '',
  DIALECT: process.env.DIALECT,
  ACCESS_KEY: process.env.ACCESS_KEY,
  REFRESH_KEY: process.env.REFRESH_KEY,
};
