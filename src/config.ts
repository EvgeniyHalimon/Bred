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
  SECRET: process.env.SECRET ?? '',
  EXPIRES_IN: process.env.EXPIRES_IN ?? '1h',
  DIALECT: process.env.DIALECT,
};
