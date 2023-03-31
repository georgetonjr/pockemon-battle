import { Express } from 'express';
import { PokemonRouter } from './Pokemon/pokemon.router';

export default (app: Express) => {
  app.get('/health', (_, res) => {
    res.status(200).send({ status: 'Up' });
  });
  app.use(PokemonRouter);
};
