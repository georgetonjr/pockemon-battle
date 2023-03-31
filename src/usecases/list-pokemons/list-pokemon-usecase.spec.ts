import { ListPokemon, ListPokemonUsecase } from './list-pokemon-usecase';
import { pokemonRepositoryMock } from '../port/repository/pokemon-repository.mock';
import { mockReset } from 'jest-mock-extended';
import { pokemonMock } from '@entities/mock/pokemon.mock';
import { PokemonNotFoundError } from '@usecases/errors/pokemon-not-found-error';

const makeSUT = () => new ListPokemon(pokemonRepositoryMock);

describe('list pokemon usecase', () => {
  let sut: ListPokemonUsecase;

  beforeEach(() => {
    sut = makeSUT();
    mockReset(pokemonRepositoryMock);
  });

  test('should call execute with success', async () => {
    pokemonRepositoryMock.list.mockResolvedValue([pokemonMock]);
    const result = await sut.execute();
    expect(result).toEqual([pokemonMock]);
    expect(pokemonRepositoryMock.list).toHaveBeenCalledTimes(1);
  });

  test('should call execute and gets PokemonNotFoundError', async () => {
    pokemonRepositoryMock.list.mockResolvedValue([]);
    try {
      await sut.execute();
    } catch (error) {
      expect(pokemonRepositoryMock.list).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(PokemonNotFoundError);
    }
  });
});
