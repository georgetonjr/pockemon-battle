import { Controller } from '@adapters/port/controller';
import { ContainerVersion, injectionFactory } from '@external/dependency-injection/factory';
import { adapterController } from '@external/http/express-controller-adapter';
import { Router } from 'express';

export const BattleRouter = Router();

BattleRouter.post(
  '/batalhar/:pokemonAId/:pokemonBId',
  [
    adapterController(injectionFactory<Controller>('PokemonBattleController', ContainerVersion.DEFAULT)),
  ],
);
