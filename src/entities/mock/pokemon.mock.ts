import { Pokemon } from '@entities/pokemon';
import { faker } from '@faker-js/faker/locale/pt_BR';

const tipos = ['charizard', 'mewtwo', 'pikachu'];

export const pokemonMock = {
  id: faker.datatype.number(),
  nivel: faker.datatype.number({ max: 2 }),
  tipo: tipos[faker.datatype.number({ max: 2 })],
  treinador: faker.datatype.string(),
} as Pokemon;
