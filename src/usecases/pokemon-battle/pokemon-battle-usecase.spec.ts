import { pokemonRepositoryMock } from '../port/repository/pokemon-repository.mock';
import { mockReset } from 'jest-mock-extended';
import { pokemonMock } from '@entities/mock/pokemon.mock';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { PokemonBattle, PokemonBattleUsecase } from './pokemon-battle-usecase';
import { PokemonBattleRequest } from './domain/pokemon-battle-request';
import { PokemonNotFoundError } from '@usecases/errors/pokemon-not-found-error';


const makeSUT = () => new PokemonBattle(pokemonRepositoryMock);
const payload = { 
  pokemonAId: faker.datatype.number(),
  pokemonBId: faker.datatype.number(), 
} as PokemonBattleRequest;

const pokemonAMock = { 
  ...pokemonMock, 
  id: payload.pokemonAId,
  nivel: 10,
};
const pokemonBMock = { 
  ...pokemonMock,
  id: payload.pokemonBId, 
  nivel: 13,
};

describe('pokemon battle usecase', () => {
  let sut: PokemonBattleUsecase;
  beforeEach(() => {
    sut = makeSUT();
    mockReset(pokemonRepositoryMock);
  });

  test('should call execute with success with pokemon B higher level', async () => {
    pokemonRepositoryMock.findById.mockResolvedValue({ 
      ...pokemonAMock, 
      nivel: 15, 
    });
    pokemonRepositoryMock.findById.mockResolvedValueOnce(pokemonBMock);
    await sut.execute(payload);
    expect(pokemonRepositoryMock.findById).toHaveBeenCalledTimes(3);
    expect(pokemonRepositoryMock.findById).toHaveBeenNthCalledWith(1, pokemonAMock.id);
    expect(pokemonRepositoryMock.findById).toHaveBeenNthCalledWith(2, pokemonBMock.id);
  });

  test('should call execute with success with pokemon A higher level', async () => {
    pokemonRepositoryMock.findById.mockResolvedValue({ 
      ...pokemonAMock, 
      nivel: 1, 
    });
    pokemonRepositoryMock.findById.mockResolvedValueOnce(pokemonBMock);

    await sut.execute(payload);
    expect(pokemonRepositoryMock.findById).toHaveBeenCalledTimes(3);
    expect(pokemonRepositoryMock.findById).toHaveBeenNthCalledWith(1, pokemonAMock.id);
    expect(pokemonRepositoryMock.findById).toHaveBeenNthCalledWith(2, pokemonBMock.id);
  });

  test('should call execute with success with same level', async () => {
    pokemonRepositoryMock.findById.mockResolvedValue({ 
      ...pokemonAMock, 
      nivel: 5, 
    });
    pokemonRepositoryMock.findById.mockResolvedValueOnce({ 
      ...pokemonBMock,
      nivel: 5, 
    });
    
    await sut.execute(payload);
    expect(pokemonRepositoryMock.findById).toHaveBeenCalledTimes(3);
    expect(pokemonRepositoryMock.findById).toHaveBeenNthCalledWith(1, pokemonAMock.id);
    expect(pokemonRepositoryMock.findById).toHaveBeenNthCalledWith(2, pokemonBMock.id);
  });


  test('should call execute and gets PokemonNotFoundError', async () => {
    pokemonRepositoryMock.findById.mockResolvedValue(undefined);
    pokemonRepositoryMock.findById.mockResolvedValueOnce(undefined);
    try {
      await sut.execute(payload);
    } catch (error) {
      expect(pokemonRepositoryMock.findById).toHaveBeenCalledTimes(2);
      expect(pokemonRepositoryMock.findById).toHaveBeenNthCalledWith(1, pokemonAMock.id);
      expect(pokemonRepositoryMock.findById).toHaveBeenNthCalledWith(2, pokemonBMock.id);
      expect(error).toBeInstanceOf(PokemonNotFoundError);
    }
  });
});
