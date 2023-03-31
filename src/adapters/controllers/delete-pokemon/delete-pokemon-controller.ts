import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { Controller } from '@adapters/port/controller';
import { HttpRequest } from '@adapters/port/http-request';
import { HttpResponse } from '@adapters/port/http-response';
import { DeletePokemonUsecase } from '@usecases/delete-pokemon/delete-pokemon-usecase';
import { DeletePokemonRequest } from '@usecases/delete-pokemon/domain/delete-pokemon-request';

@injectable()
export class DeletePokemonController extends Controller {
  constructor(
    @inject('DeletePokemonUsecase')
    private usecase: DeletePokemonUsecase,
  ) {
    super();
  }

  private mapError(error: Error, response: HttpResponse) {
    switch (error.message) {
      case 'Pokemon not found':
        response.status(404).json({ message: 'Pokemon not exists' });
        break;
      default:
        response.status(400).json(error);
        break;
    }
  }
  
  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      await this.usecase.execute(request.params as DeletePokemonRequest);
      response.sendStatus(204);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
