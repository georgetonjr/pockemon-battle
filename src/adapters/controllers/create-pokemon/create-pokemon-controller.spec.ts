import { faker } from '@faker-js/faker/locale/pt_BR';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { CreatePokemon } from '@usecases/create-pokemon/create-pokemon-usecase';
import { mock, mockReset } from 'jest-mock-extended';
import { CreatePokemonController } from './create-pokemon-controller';
import { pokemonMock } from '@entities/mock/pokemon.mock';

const mockUseCase = mock<CreatePokemon>();
const { res: response } = getMockRes();
const payload = {
  tipo: faker.datatype.string(),
  treinador: faker.datatype.string(),
};

const request = getMockReq({ body: payload });


describe('create pokemon controller', () => {
  let sut: CreatePokemonController;

  beforeEach(() => {
    mockReset(mockUseCase);

    sut = new CreatePokemonController(mockUseCase);
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
