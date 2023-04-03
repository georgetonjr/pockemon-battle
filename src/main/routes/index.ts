import { Express } from 'express';
import { PokemonRouter } from './Pokemon/pokemon.router';
import { BattleRouter } from './battle/battle.router';

export default (app: Express) => {
  app.get('/health', (_, res) => {
    res.status(200).send({ status: 'Up' });
  });
  app.use([
    PokemonRouter, 
    BattleRouter,
  ]);
};
