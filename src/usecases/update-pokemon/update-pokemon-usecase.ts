import { UseCase } from '@usecases/port/usecase';
import { PokemonRepository } from '@usecases/port/repository/pokemon-repository';
import { inject, injectable } from 'tsyringe';
import { UpdatePokemonRequest } from './domain/update-pokemon-request';

export abstract class UpdatePokemonUsecase extends UseCase<UpdatePokemonRequest, void> {}

@injectable()
export class UpdatePokemon extends UpdatePokemonUsecase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository:PokemonRepository,
  ) {
    super();
  }


  async execute(request: UpdatePokemonRequest): Promise<void> {
    try {
      await this.pokemonRepository.updateOne({ 
        criteria: Number(request.id), 
        treinador: request.treinador, 
      });
    } catch (error) {
      throw error;
    }
  }
}

