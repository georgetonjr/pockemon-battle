import express, { Express } from 'express';
import setupProviders from './providers';
import upRoutes from './routes';

export const app = async (): Promise<Express> => {
  const expressApp = express();
  expressApp.use(express.json());
  upRoutes(expressApp);
  await setupProviders();
  return expressApp;
};
