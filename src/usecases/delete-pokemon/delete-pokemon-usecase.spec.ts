import { pokemonRepositoryMock } from '../port/repository/pokemon-repository.mock';
import { mockReset } from 'jest-mock-extended';
import { pokemonMock } from '@entities/mock/pokemon.mock';
import { DeletePokemon, DeletePokemonUsecase } from './delete-pokemon-usecase';
import { DeletePokemonRequest } from './domain/delete-pokemon-request';

const makeSUT = () => new DeletePokemon(pokemonRepositoryMock);

const payload = { 
  id: String(pokemonMock.id), 
} as DeletePokemonRequest;

describe('delete pokemon usecase', () => {
  let sut: DeletePokemonUsecase;

  beforeEach(() => {
    sut = makeSUT();
    mockReset(pokemonRepositoryMock);
  });

  test('should call execute with success', async () => {
    await sut.execute(payload);
    expect(pokemonRepositoryMock.deleteOne).toHaveBeenCalledTimes(1);
    expect(pokemonRepositoryMock.deleteOne).toHaveBeenCalledWith(Number(payload.id));
  });

  test('should call execute and gets any error', async () => {
    pokemonRepositoryMock.deleteOne.mockRejectedValue(new Error('any_error'));
    try {
      await sut.execute(payload);
    } catch (error) {
      expect(pokemonRepositoryMock.deleteOne).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(Error);
    }
  });
});
