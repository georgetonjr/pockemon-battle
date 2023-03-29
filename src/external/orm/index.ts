import { Sequelize } from 'sequelize';
import { config } from '../../main/config';
import PokemonEntity from './entities/pokemon-entity';

const models = [PokemonEntity];

export const sequelizeConnection = 
  new Sequelize(config.DATABASE.DATABASE_NAME, config.DATABASE.USER, config.DATABASE.PASSWORD, {
    host: config.DATABASE.HOST,
    dialect: 'mssql',
    schema: 'schema-georgeton',
    logging: false,
  });

models.forEach(model => model.initialize(sequelizeConnection));

export { sequelizeConnection as Database, PokemonEntity as pokemonEntity };
