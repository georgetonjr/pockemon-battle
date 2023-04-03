import { Pokemon } from '@entities/pokemon';

export interface UpdateOptions {
  treinador?: string;
  tipo?: string;
  nivel?: number;
}

export interface SaveOptions {
  tipo: string;
  treinador: string;
}

export interface PokemonRepository {
  save(options: SaveOptions): Promise<Pokemon>;
  list(): Promise<Pokemon[]>;
  findById(id: number): Promise<Pokemon>;
  updateOne(updateOptions: UpdateOptions, id: number): Promise<void>;
  deleteOne(id: number): Promise<void>;
}
