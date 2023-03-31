import { UseCase } from '@usecases/port/usecase';
import { PokemonRepository } from '@usecases/port/repository/pokemon-repository';
import { inject, injectable } from 'tsyringe';
import { DeletePokemonRequest } from './domain/delete-pokemon-request';

export abstract class DeletePokemonUsecase extends UseCase<DeletePokemonRequest, void> {}

@injectable()
export class DeletePokemon extends DeletePokemonUsecase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository:PokemonRepository,
  ) {
    super();
  }


  async execute(request: DeletePokemonRequest): Promise<void> {
    try {
      await this.pokemonRepository.deleteOne(Number(request.id));
    } catch (error) {
      throw error;
    }
  }
}

