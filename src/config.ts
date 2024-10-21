// library
import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  HOST: process.env.PROD ? process.env.HOST : process.env.HOST_DEV,
  DB_PORT: process.env.PROD
    ? Number(process.env.DB_PORT)
    : Number(process.env.DB_PORT_DEV),
  SERVER_PORT: process.env.SERVER_PORT ?? 3001,
  DB_USERNAME: process.env.PROD
    ? process.env.DB_USERNAME
    : process.env.DB_USERNAME_DEV,
  PASSWORD: process.env.PROD ? process.env.PASSWORD : process.env.PASSWORD_DEV,
  DATABASE: process.env.PROD ? process.env.DATABASE : process.env.DATABASE_DEV,
  SECRET_ACCESS: process.env.SECRET_ACCESS,
  SECRET_REFRESH: process.env.SECRET_REFRESH,
  EXPIRES_IN: process.env.EXPIRES_IN ?? '',
  EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH ?? '',
  DIALECT: process.env.DIALECT,
  URI: process.env.URI,
  MYSQL_SSL_CERT: process.env.MYSQL_SSL_CERT,
  FE_URL: process.env.PROD
    ? String(process.env.FE_URL)
    : 'http://localhost:5173/',
};
