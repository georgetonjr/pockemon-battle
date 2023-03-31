import { UseCase } from '@usecases/port/usecase';
import { PokemonRepository } from '@usecases/port/repository/pokemon-repository';
import { inject, injectable } from 'tsyringe';
import { ListPokemonResponse } from './domain/list-pokemon-response';
import { PokemonNotFoundError } from '@usecases/errors/pokemon-not-found-error';

export abstract class ListPokemonUsecase extends UseCase<void, ListPokemonResponse[]> {}

@injectable()
export class ListPokemon extends ListPokemonUsecase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository:PokemonRepository,
  ) {
    super();
  }


  async execute(): Promise<ListPokemonResponse[]> {
    try {
      const pokemons = await this.pokemonRepository.list();
      if (!pokemons.length) {
        throw new PokemonNotFoundError();
      }
      return pokemons;
    } catch (error) {
      throw error;
    }
  }
}

