import { pokemonRepositoryMock } from '../port/repository/pokemon-repository.mock';
import { mockReset } from 'jest-mock-extended';
import { pokemonMock } from '@entities/mock/pokemon.mock';
import { UpdatePokemon, UpdatePokemonUsecase } from './update-pokemon-usecase';
import { UpdatePokemonRequest } from './domain/update-pokemon-request';
import { faker } from '@faker-js/faker/locale/pt_BR';

const makeSUT = () => new UpdatePokemon(pokemonRepositoryMock);

const payload = { 
  id: String(pokemonMock.id), 
  treinador: faker.datatype.string(), 
} as UpdatePokemonRequest;

describe('update pokemon usecase', () => {
  let sut: UpdatePokemonUsecase;

  beforeEach(() => {
    sut = makeSUT();
    mockReset(pokemonRepositoryMock);
  });

  test('should call execute with success', async () => {
    pokemonRepositoryMock.updateOne.mockResolvedValue();
    await sut.execute(payload);
    expect(pokemonRepositoryMock.updateOne).toHaveBeenCalledTimes(1);
  });

  test('should call execute and gets instanceof Error', async () => {
    pokemonRepositoryMock.updateOne.mockRejectedValue(new Error('Pokemon not found'));
    try {
      await sut.execute(payload);
    } catch (error) {
      expect(pokemonRepositoryMock.updateOne).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(Error);
    }
  });
});
