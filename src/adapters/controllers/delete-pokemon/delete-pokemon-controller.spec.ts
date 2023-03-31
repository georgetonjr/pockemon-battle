import { faker } from '@faker-js/faker/locale/pt_BR';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { mock, mockReset } from 'jest-mock-extended';
import { DeletePokemon } from '@usecases/delete-pokemon/delete-pokemon-usecase';
import { DeletePokemonController } from './delete-pokemon-controller';

const mockUseCase = mock<DeletePokemon>();
const { res: response } = getMockRes();
const payload = {
  id: faker.datatype.number(),
};

const request = getMockReq({ body: payload });


describe('delete pokemon controller', () => {
  let sut: DeletePokemonController;

  beforeEach(() => {
    mockReset(mockUseCase);

    sut = new DeletePokemonController(mockUseCase);
  });

  test('should call handle with success', async () => {
    mockUseCase.execute.mockResolvedValue();
    await sut.handle(request, response);

    expect(response.sendStatus).toHaveBeenCalledTimes(1);
    expect(response.sendStatus).toHaveBeenCalledWith(204);
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

  test('should call handle and gets Pokemon not exists', async () => {
    try {
      mockUseCase.execute.mockRejectedValue(new Error('Pokemon not found'));
      await sut.handle(request, response);

    } catch (error) {
      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Pokemon not exists');
    }
  });
});


