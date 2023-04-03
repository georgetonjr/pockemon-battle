import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { config } from '../config';

export default (app: Express) => { 
  const swaggerDocumentPath = path.resolve(__dirname, '..', '..', '..', './swagger.yml');
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(
    YAML.load(swaggerDocumentPath), { 
      customfavIcon: config.SWAGGER_FAV_ICON_URL, 
    }));
};
