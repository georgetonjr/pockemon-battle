import { Pokemon } from '@entities/pokemon';

export interface LoserPokemon extends Pokemon {
  message?: string;
}

export interface PokemonBattleResponse {
  vencedor: Pokemon;
  perdedor: LoserPokemon;
}
