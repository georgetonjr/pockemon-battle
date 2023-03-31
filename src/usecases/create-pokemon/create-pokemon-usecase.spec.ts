import { pokemonRepositoryMock } from '../port/repository/pokemon-repository.mock';
import { mockReset } from 'jest-mock-extended';
import { pokemonMock } from '@entities/mock/pokemon.mock';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { CreatePokemonRequest } from './domain/create-pokemon-request';
import { CreatePokemon, CreatePokemonUsecase } from './create-pokemon-usecase';

const makeSUT = () => new CreatePokemon(pokemonRepositoryMock);

const payload = { 
  tipo: faker.datatype.string(),
  treinador: faker.datatype.string(), 
} as CreatePokemonRequest;

describe('create pokemon usecase', () => {
  let sut: CreatePokemonUsecase;

  beforeEach(() => {
    sut = makeSUT();
    mockReset(pokemonRepositoryMock);
  });

  test('should call execute with success', async () => {
    pokemonRepositoryMock.save.mockResolvedValue(pokemonMock);
    const result = await sut.execute(payload);
    expect(result).toEqual(pokemonMock);
    expect(pokemonRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(pokemonRepositoryMock.save).toHaveBeenCalledWith(payload);
  });

  test('should call execute and gets any error', async () => {
    pokemonRepositoryMock.save.mockRejectedValue(new Error('any_error'));
    try {
      await sut.execute(payload);
    } catch (error) {
      expect(pokemonRepositoryMock.save).toHaveBeenCalledTimes(1);
      expect(pokemonRepositoryMock.save).toHaveBeenCalledWith(payload);
      expect(error).toBeInstanceOf(Error);
    }
  });
});
