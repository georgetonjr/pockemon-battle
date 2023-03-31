import { UseCase } from '@usecases/port/usecase';
import { CreatePokemonRequest } from './domain/create-pokemon-request';
import { CreatePokemonResponse } from './domain/create-pokemon-response';
import { PokemonRepository } from '@usecases/port/repository/pokemon-repository';
import { inject, injectable } from 'tsyringe';

export abstract class CreatePokemonUsecase extends UseCase<CreatePokemonRequest, CreatePokemonResponse> {}

@injectable()
export class CreatePokemon extends CreatePokemonUsecase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository:PokemonRepository,
  ) {
    super();
  }


  async execute(request: CreatePokemonRequest): Promise<CreatePokemonResponse> {
    try {
      const pokemon = await this.pokemonRepository.save(request);
      return pokemon;
    } catch (error) {
      return error;
    }
  }
}

