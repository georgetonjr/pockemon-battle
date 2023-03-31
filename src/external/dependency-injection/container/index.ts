import { CreatePokemonController } from '@adapters/controllers/create-pokemon/create-pokemon-controller';
import { DeletePokemonController } from '@adapters/controllers/delete-pokemon/delete-pokemon-controller';
import { GetPokemonController } from '@adapters/controllers/get-pokemon/get-pokemon-controller';
import { ListPokemonController } from '@adapters/controllers/list-pokemon/list-pokemon-controller';
import { UpdatePokemonController } from '@adapters/controllers/update-pokemon/update-pokemon-controller';
import { PokemonRepositorySequelize } from '@external/orm/repositories/pokemon-repository-sequelize';
import { CreatePokemon } from '@usecases/create-pokemon/create-pokemon-usecase';
import { DeletePokemon } from '@usecases/delete-pokemon/delete-pokemon-usecase';
import { GetPokemon } from '@usecases/get-pokemon/get-pokemon-usecase';
import { ListPokemon } from '@usecases/list-pokemons/list-pokemon-usecase';
import { UpdatePokemon } from '@usecases/update-pokemon/update-pokemon-usecase';
import { Lifecycle, container } from 'tsyringe';

// controller
container.register('CreatePokemonController', { useClass: CreatePokemonController });
container.register('UpdatePokemonController', { useClass: UpdatePokemonController });
container.register('ListPokemonController', { useClass: ListPokemonController });
container.register('GetPokemonController', { useClass: GetPokemonController });
container.register('DeletePokemonController', { useClass: DeletePokemonController });

// usecase
container.register('CreatePokemonUsecase', { useClass: CreatePokemon });
container.register('GetPokemonUsecase', { useClass: GetPokemon });
container.register('ListPokemonUsecase', { useClass: ListPokemon });
container.register('DeletePokemonUsecase', { useClass: DeletePokemon });
container.register('UpdatePokemonUsecase', { useClass: UpdatePokemon });

// repository
container.register('PokemonRepository', { useClass: PokemonRepositorySequelize }, { lifecycle: Lifecycle.Singleton });
