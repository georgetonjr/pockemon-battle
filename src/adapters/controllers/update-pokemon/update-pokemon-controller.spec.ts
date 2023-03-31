import { faker } from '@faker-js/faker/locale/pt_BR';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { mock, mockReset } from 'jest-mock-extended';
import { UpdatePokemonUsecase } from '@usecases/update-pokemon/update-pokemon-usecase';
import { UpdatePokemonController } from './update-pokemon-controller';

const mockUseCase = mock<UpdatePokemonUsecase>();
const { res: response } = getMockRes();
const body = {
  treinador: faker.datatype.string(),
};

const request = getMockReq({ 
  body, 
  params: { id: String(faker.datatype.number()) }, 
});


describe('update pokemon controller', () => {
  let sut: UpdatePokemonController;

  beforeEach(() => {
    mockReset(mockUseCase);

    sut = new UpdatePokemonController(mockUseCase);
  });

  test('should call handle with success', async () => {
    mockUseCase.execute.mockResolvedValue();
    await sut.handle(request, response);

    expect(response.sendStatus).toHaveBeenCalledTimes(1);
    expect(response.sendStatus).toHaveBeenCalledWith(204);
  });

  test('should call handle and gets Pokemon not found', async () => {
    try {
      mockUseCase.execute.mockRejectedValue(new Error('Pokemon not found'));
      await sut.handle(request, response);

    } catch (error) {
      expect(response.status).toHaveBeenCalledTimes(1);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Pokemon not found');
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


