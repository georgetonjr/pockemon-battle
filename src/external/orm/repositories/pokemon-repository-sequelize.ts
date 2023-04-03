import { Pokemon } from '../../../entities/pokemon';
import { pokemonEntity } from '..';
import { Model } from 'sequelize';
import { injectable } from 'tsyringe';
import { PokemonRepository, SaveOptions, UpdateOptions } from '@usecases/port/repository/pokemon-repository';

@injectable()
export class PokemonRepositorySequelize implements PokemonRepository {
  private repository;

  constructor() {
    this.repository = pokemonEntity;
  }

  async      updateOne(updateOptions: UpdateOptions, id: number): Promise<void> {
    const pokemonExists = await this.repository.findByPk(id);
    if (!pokemonExists) {
      throw new Error('Pokemon not found');
    }

    await this.repository.update(updateOptions, { where: { id } });
  }

  async save({ tipo, treinador }: SaveOptions): Promise<Pokemon> {
    const result = await this.repository.create({ 
      tipo,
      treinador, 
    });

    return this.mapper(result);
  }

  async list(): Promise<Pokemon[]> {
    const result = await this.repository.findAll();
    return result.map((pokemon: Model<Pokemon, Pokemon>) => this.mapper(pokemon));
  }

  async findById(id: number): Promise<Pokemon> {
    const result = await this.repository.findByPk(id);
    if (!result) {
      return;
    }
    return this.mapper(result as Model<Pokemon, Pokemon>);
  }

  async deleteOne(id: number) {
    const pokemonExists = await this.repository.findByPk(id);
    if (!pokemonExists) {
      throw new Error('Pokemon not found');
    }
    await this.repository.destroy({ where: { id } });
  }

  private mapper({
    dataValues: { id, nivel, tipo, treinador },
  }: Model<Pokemon, Pokemon>): Pokemon {
    return Object.assign(new Pokemon(), {
      id,
      tipo,
      treinador,
      nivel,
    });
  }
}
