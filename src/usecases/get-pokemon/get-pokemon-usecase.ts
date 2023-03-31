import { UseCase } from '@usecases/port/usecase';
import { PokemonRepository } from '@usecases/port/repository/pokemon-repository';
import { inject, injectable } from 'tsyringe';
import { GetPokemonRequest } from './domain/get-pokemon-request';
import { GetPokemonResponse } from './domain/get-pokemon-response';
import { PokemonNotFoundError } from '@usecases/errors/pokemon-not-found-error';

export abstract class GetPokemonUsecase extends UseCase<GetPokemonRequest, GetPokemonResponse> {}

@injectable()
export class GetPokemon extends GetPokemonUsecase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository:PokemonRepository,
  ) {
    super();
  }


  async execute(request: GetPokemonRequest): Promise<GetPokemonResponse> {
    try {
      const pokemon = await this.pokemonRepository.findById(Number(request.id));
      if (!pokemon) {
        throw new PokemonNotFoundError();
      }
      return pokemon;
    } catch (error) {
      throw error;
    }
  }
}

