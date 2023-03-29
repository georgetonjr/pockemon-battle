import env from 'dotenv';
import path from 'path';

env.config({
  path: path.join(__dirname, `../../../env/.env.${process.env.NODE_ENV}`),
});

process.env.ENVIRONMENT = process.env.ENVIRONMENT || process.env.NODE_ENV;

export const config = {
  SERVER_PORT: process.env.SERVER_PORT,

  ENVIRONMENT: process.env.ENVIRONMENT || 'dev',

  DATABASE: {
    HOST: process.env.DATABASE_HOST || 'localhost',
    PORT: Number(process.env.DATABASE_PORT) || 1433,
    USER: process.env.DATABASE_USERNAME || 'SA',
    PASSWORD: process.env.DATABASE_PASSWORD || 'vq9*JD&bTdTeZLdT',
    DATABASE_NAME: process.env.DATABASE_NAME || 'pokemons',
    SCHEMA: process.env.DATABASE_SCHEMA || 'schema-georgeton',
  },
};
