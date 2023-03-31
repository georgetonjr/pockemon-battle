import { pokemonRepositoryMock } from '../port/repository/pokemon-repository.mock';
import { mockReset } from 'jest-mock-extended';
import { pokemonMock } from '@entities/mock/pokemon.mock';
import { GetPokemonRequest } from './domain/get-pokemon-request';
import { GetPokemon, GetPokemonUsecase } from './get-pokemon-usecase';
import { PokemonNotFoundError } from '@usecases/errors/pokemon-not-found-error';

const makeSUT = () => new GetPokemon(pokemonRepositoryMock);

const payload = { 
  id: String(pokemonMock.id), 
} as GetPokemonRequest;

describe('get pokemon usecase', () => {
  let sut: GetPokemonUsecase;

  beforeEach(() => {
    sut = makeSUT();
    mockReset(pokemonRepositoryMock);
  });

  test('should call execute with success', async () => {
    pokemonRepositoryMock.findById.mockResolvedValue(pokemonMock);
    const result = await sut.execute(payload);
    expect(pokemonRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(pokemonMock);
    expect(pokemonRepositoryMock.findById).toHaveBeenCalledWith(Number(payload.id));
  });

  test('should call execute and gets PokemonNotFoundError', async () => {
    pokemonRepositoryMock.findById.mockResolvedValue(undefined);
    try {
      await sut.execute(payload);
    } catch (error) {
      expect(pokemonRepositoryMock.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(PokemonNotFoundError);
    }
  });
});
