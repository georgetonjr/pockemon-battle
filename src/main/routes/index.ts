import { Express } from 'express';

export default (app: Express) => {
  app.get('/health', (_, res) => {
    res.status(200).send({ status: 'Up' });
  });
};
