import express, { Express } from 'express';
import setupProviders from './providers';
import upRoutes from './routes';
import cors from 'cors';
import doc from './doc';

export const app = async (): Promise<Express> => {
  const expressApp = express();
  expressApp.use(express.json());
  upRoutes(expressApp);
  doc(expressApp);
  await setupProviders();
  expressApp.use(cors());
  return expressApp;
};
