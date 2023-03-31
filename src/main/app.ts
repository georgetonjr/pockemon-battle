import express, { Express } from 'express';
import setupProviders from './providers';
import upRoutes from './routes';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { config } from './config';

export const app = async (): Promise<Express> => {
  const expressApp = express();
  expressApp.use(express.json());
  upRoutes(expressApp);
  const swaggerDocumentPath = path.resolve(__dirname, '..', '..', './swagger.yml');
  expressApp.use('/api', swaggerUi.serve, swaggerUi.setup(
    YAML.load(swaggerDocumentPath), { 
      customfavIcon: config.SWAGGER_FAV_ICON_URL, 
    }));
  await setupProviders();
  expressApp.use(cors());
  return expressApp;
};
