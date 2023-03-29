import { Pokemon } from '../../../entities/pokemon';
import { pokemonEntity } from '..';
import { Model } from 'sequelize';

export interface UpdateOptions {
  treinador: string;
}

export class PolemonRepositorySequelize {
  private repository;

  constructor() {
    this.repository = pokemonEntity;
  }

  async list(): Promise<Pokemon[]> {
    // this.repository.create({ nivel: 2, tipo: 'tu', treinador: 'mew' });
    const result = await this.repository.findAll();
    return result.map((pokemon) => this.mapper(pokemon));
  }

  async findById(id: number): Promise<Pokemon> {
    // const result = await this.repository.findOne({ where: { id: 1 } });
    const result = await this.repository.findByPk(id);

    return this.mapper(result as Model<Pokemon, Pokemon>);
  }

  async updateOne(
    identifier: number,
    { treinador }: UpdateOptions,
  ): Promise<void> {
    await this.repository.update({ treinador }, { where: { id: identifier } });
  }

  async deleteOne(id: number) {
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
