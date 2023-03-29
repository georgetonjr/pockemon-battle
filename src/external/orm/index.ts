import { Sequelize } from 'sequelize';
import { config } from '../../main/config';
import PokemonEntity from './entities/pokemon-entity';
import { PolemonRepositorySequelize } from './repositories/pokemon-repository-sequelize';

const models = [PokemonEntity];

export const sequelizeConnection = 
  new Sequelize(config.DATABASE.DATABASE_NAME, config.DATABASE.USER, config.DATABASE.PASSWORD, {
    host: config.DATABASE.HOST,
    dialect: 'mssql',
    schema: 'schema-georgeton',
    logging: false,
  });

models.forEach(model => model.initialize(sequelizeConnection));

// new PolemonRepositorySequelize().updateOne(1, { treinador: 'voce' }).then(res => console.log(res));

new PolemonRepositorySequelize().deleteOne(1).then(res => console.log(res));

new PolemonRepositorySequelize().list().then(res => console.log(res));

export { sequelizeConnection as Database, PokemonEntity as pokemonEntity };

// Server:  desafio-jazida.database.windows.net
//    Database: Desafio-jz
//    User: DesafioAdmin
//    Pass: Picachu123
//    Schema: schema-georgeton
