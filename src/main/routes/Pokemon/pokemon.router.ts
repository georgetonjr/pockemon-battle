import { ContainerVersion, injectionFactory } from '@external/dependency-injection/factory';
import { adapterController } from '@external/http/express-controller-adapter';
import { Router } from 'express';
import { Controller } from '@adapters/port/controller';
import { CreatePokemonValidator } from '@main/middleware/create-pokemon-validator-middleware';
import { UpdatePokemonValidator } from '@main/middleware/update-pokemon-validator-middleware';

export const PokemonRouter = Router();

PokemonRouter.post(
  '/pokemons',
  [
    CreatePokemonValidator,
    adapterController(injectionFactory<Controller>('CreatePokemonController', ContainerVersion.DEFAULT)),
  ],
);

// get pokemon by id
PokemonRouter.get(
  '/pokemons/:id',
  [
    adapterController(injectionFactory<Controller>('GetPokemonController', ContainerVersion.DEFAULT)),
  ],
);

// list pokemons
PokemonRouter.get(
  '/pokemons',
  [
    adapterController(injectionFactory<Controller>('ListPokemonController', ContainerVersion.DEFAULT)),
  ],
);

// update pokemon
PokemonRouter.put(
  '/pokemons/:id',
  [
    UpdatePokemonValidator,
    adapterController(injectionFactory<Controller>('UpdatePokemonController', ContainerVersion.DEFAULT)),
  ],
);

// delete
PokemonRouter.delete(
  '/pokemons/:id',
  [
    adapterController(injectionFactory<Controller>('DeletePokemonController', ContainerVersion.DEFAULT)),
  ],
);
