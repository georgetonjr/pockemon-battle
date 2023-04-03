import { UseCase } from '@usecases/port/usecase';
import { PokemonRepository } from '@usecases/port/repository/pokemon-repository';
import { inject, injectable } from 'tsyringe';
import { PokemonBattleRequest } from './domain/pokemon-battle-request';
import { LoserPokemon, PokemonBattleResponse } from './domain/pokemon-battle-response';
import { Pokemon } from '@entities/pokemon';
import { PokemonNotFoundError } from '@usecases/errors/pokemon-not-found-error';

export abstract class PokemonBattleUsecase extends UseCase<PokemonBattleRequest, PokemonBattleResponse> {}

@injectable()
export class PokemonBattle extends PokemonBattleUsecase {
  constructor(
    @inject('PokemonRepository')
    private pokemonRepository:PokemonRepository,
  ) {
    super();
  }


  async execute(request: PokemonBattleRequest): Promise<PokemonBattleResponse> {
    try {
      const pokemonA = await this.pokemonRepository.findById(request.pokemonAId);
      const pokemonB = await this.pokemonRepository.findById(request.pokemonBId);
      let pokemonsArr: Pokemon[];
      
      if (!pokemonA || !pokemonB) {
        throw new PokemonNotFoundError();
      }

      switch (this.highestLevelPokemon(pokemonA, pokemonB)) {
        case 'pokemonA':
          pokemonsArr = this.generatePokemonList(pokemonA, pokemonB);
          break;
        case 'pokemonB':

          pokemonsArr = this.generatePokemonList(pokemonB, pokemonA);
          break;
        case 'sameLevel':
          pokemonsArr = this.sameLevelPokemon(pokemonA, pokemonB);
          break;
      }
      const pokemons = [pokemonA, pokemonB];
      const winningPokemon = this.battle(pokemonsArr);
      const loserPokemon = pokemons.find(pokemon => pokemon.id !== winningPokemon.id);
      const response = await this.buildReponse(winningPokemon, loserPokemon);
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  private async updateLoserPokemon(loserPokemon: Pokemon): Promise<LoserPokemon> {
    const pokemonLevel = loserPokemon.nivel - 1;
    loserPokemon.nivel = pokemonLevel;

    if (pokemonLevel === 0) {
      await this.pokemonRepository.deleteOne(loserPokemon.id);
      return { 
        ...loserPokemon, 
        message: 'Pokemon morreu e foi deletado!', 
      };
    }

    await this.pokemonRepository.updateOne({ nivel: pokemonLevel }, loserPokemon.id);
    return loserPokemon;
  }

  private async updateWinningPokemon(winningPokemon: Pokemon): Promise<Pokemon> {
    const pokemonNivel = winningPokemon.nivel + 1;
    winningPokemon.nivel = pokemonNivel;
    await this.pokemonRepository.updateOne({ 
      nivel: pokemonNivel, 
    }, winningPokemon.id);
    await this.pokemonRepository.findById(winningPokemon.id);
    return winningPokemon;
  }


  private async buildReponse(winningPokemon: Pokemon, loserPokemon: Pokemon): Promise<PokemonBattleResponse> {
    const vencedor = await this.updateWinningPokemon(winningPokemon);
    const perdedor = await this.updateLoserPokemon(loserPokemon);
    return {
      vencedor,
      perdedor,
    };
  }

  private highestLevelPokemon(pokemonA: Pokemon, pokemonB: Pokemon): String {
    if (pokemonA.nivel === pokemonB.nivel) {
      return 'sameLevel';
    }
    if (pokemonA.nivel > pokemonB.nivel) {
      return 'pokemonA';
    }
    if (pokemonB.nivel > pokemonA.nivel) {
      return 'pokemonB';
    }
  }

  private generatePokemonList(pokemonWithHighLevel: Pokemon, pokemonWithLowerLevel: Pokemon): Pokemon[] {
    const pokemons = [] as Pokemon[];
    for (let index = 0; index <= 65; index++) {
      pokemons.push(pokemonWithHighLevel);
    }

    for (let index = 0; index <= 33; index++) {
      pokemons.push(pokemonWithLowerLevel);
    }
    return this.shuffleArray(pokemons);
  } 

  private battle(pokemonsList: Pokemon[]): Pokemon {
    const winnerIndex = Math.floor(Math.random() * 99);
    return pokemonsList[winnerIndex];
  }

  private sameLevelPokemon(pokemonA: Pokemon, pokemonB: Pokemon) {
    const pokemons = [] as Pokemon[];
    for (let index = 0; index <= 49; index++) {
      pokemons.push(pokemonA);
    }

    for (let index = 0; index <= 49; index++) {
      pokemons.push(pokemonA);
    }
    return this.shuffleArray(pokemons);
  }

  private shuffleArray(arr: Pokemon[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

