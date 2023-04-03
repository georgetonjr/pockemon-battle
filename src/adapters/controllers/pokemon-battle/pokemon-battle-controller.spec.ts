import { faker } from '@faker-js/faker/locale/pt_BR';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { mock, mockReset } from 'jest-mock-extended';
import { pokemonMock } from '@entities/mock/pokemon.mock';
import { PokemonBattleController } from '@adapters/controllers/pokemon-battle/pokemon-battle-controller';
import { PokemonBattleUsecase } from '@usecases/pokemon-battle/pokemon-battle-usecase';
import { PokemonNotFoundError } from '@usecases/errors/pokemon-not-found-error';

const mockUseCase = mock<PokemonBattleUsecase>();
const { res: response } = getMockRes();
const payload = {
  pokemonAId: faker.datatype.number(),
  pokemonBId: faker.datatype.number(),
};

const request = getMockReq({ body: payload });


describe('pokemon battle controller', () => {
  let sut: PokemonBattleController;

  beforeEach(() => {
    mockReset(mockUseCase);

    sut = new PokemonBattleController(mockUseCase);
  });

  test('should call handle with success', async () => {
    mockUseCase.execute.mockResolvedValue({ 
      vencedor: pokemonMock, 
      perdedor: {
        ...pokemonMock, 
        message: 'perdeu',
      }, 
    });
    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      vencedor: pokemonMock, 
      perdedor: {
        ...pokemonMock, 
        message: 'perdeu',
      }, 
    });
  });

  test('should call handle and gets any error', async () => {
    try {
      mockUseCase.execute.mockRejectedValue(new Error('any_error'));
      await sut.handle(request, response);

    } catch (error) {
      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('any_error');
    }
  });

  test('should call handle and gets PokemonNotFoundError', async () => {
    try {
      mockUseCase.execute.mockRejectedValue(new PokemonNotFoundError());
      await sut.handle(request, response);

    } catch (error) {
      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(PokemonNotFoundError);
    }
  });
});
