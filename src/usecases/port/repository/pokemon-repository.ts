import { Pokemon } from '@entities/pokemon';

export interface UpdateOptions {
  criteria: number;
  treinador: string;
}

export interface SaveOptions {
  tipo: string;
  treinador: string;
}

export interface PokemonRepository {
  save(options: SaveOptions): Promise<Pokemon>;
  list(): Promise<Pokemon[]>;
  findById(id: number): Promise<Pokemon>;
  updateOne(data: UpdateOptions): Promise<void>;
  deleteOne(id: number): Promise<void>;
}
