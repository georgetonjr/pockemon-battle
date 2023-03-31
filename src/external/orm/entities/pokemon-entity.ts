import { DataTypes, Model, Sequelize } from 'sequelize';
import { Pokemon } from '../../../entities/pokemon';
import { config } from '../../../main/config';

class PokemonEntity extends Model<Pokemon> {

  declare id: number;
 
  declare tipo?: string;

  declare treinador?: string;

  declare nivel?: number;

  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        tipo: DataTypes.STRING(1000),
        treinador: DataTypes.STRING(1000),
        nivel: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
        },
      },
      { 
        sequelize: sequelize,
        schema: config.DATABASE.SCHEMA,
        tableName: 'pokemons', 
        createdAt: false,
        updatedAt: false,
        timestamps: false,
      },
    );
  }
}

export default PokemonEntity;
