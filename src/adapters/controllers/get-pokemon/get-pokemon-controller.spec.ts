import { faker } from '@faker-js/faker/locale/pt_BR';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { mock, mockReset } from 'jest-mock-extended';
import { GetPokemonUsecase } from '@usecases/get-pokemon/get-pokemon-usecase';
import { GetPokemonController } from './get-pokemon-controller';
import { pokemonMock } from '@entities/mock/pokemon.mock';
import { PokemonNotFoundError } from '@usecases/errors/pokemon-not-found-error';

const mockUseCase = mock<GetPokemonUsecase>();
const { res: response } = getMockRes();
const payload = {
  id: faker.datatype.number(),
};

const request = getMockReq({ body: payload });


describe('get pokemon controller', () => {
  let sut: GetPokemonController;

  beforeEach(() => {
    mockReset(mockUseCase);

    sut = new GetPokemonController(mockUseCase);
  });

  test('should call handle with success', async () => {
    mockUseCase.execute.mockResolvedValue(pokemonMock);
    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(pokemonMock);
  });

  test('should call handle and gets any error', async () => {
    try {
      mockUseCase.execute.mockRejectedValue(new PokemonNotFoundError());
      await sut.handle(request, response);

    } catch (error) {
      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(PokemonNotFoundError);
    }
  });

  test('should call handle and gets Pokemon not exists', async () => {
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
});


