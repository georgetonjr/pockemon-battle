import { faker } from '@faker-js/faker/locale/pt_BR';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { mock, mockReset } from 'jest-mock-extended';
import { pokemonMock } from '@entities/mock/pokemon.mock';
import { ListPokemonUsecase } from '@usecases/list-pokemons/list-pokemon-usecase';
import { ListPokemonController } from './list-pokemon-controller';

const mockUseCase = mock<ListPokemonUsecase>();
const { res: response } = getMockRes();
const payload = {
  id: faker.datatype.number(),
};

const request = getMockReq({ body: payload });


describe('get pokemon controller', () => {
  let sut: ListPokemonController;

  beforeEach(() => {
    mockReset(mockUseCase);

    sut = new ListPokemonController(mockUseCase);
  });

  test('should call handle with success', async () => {
    mockUseCase.execute.mockResolvedValue([pokemonMock]);
    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith([pokemonMock]);
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
    }
  });
});


