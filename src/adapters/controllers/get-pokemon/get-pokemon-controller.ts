import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { Controller } from '@adapters/port/controller';
import { HttpRequest } from '@adapters/port/http-request';
import { HttpResponse } from '@adapters/port/http-response';
import { GetPokemonUsecase } from '@usecases/get-pokemon/get-pokemon-usecase';
import { GetPokemonRequest } from '@usecases/get-pokemon/domain/get-pokemon-request';
import { PokemonNotFoundError } from '@usecases/errors/pokemon-not-found-error';

@injectable()
export class GetPokemonController extends Controller {
  constructor(
    @inject('GetPokemonUsecase')
    private usecase: GetPokemonUsecase,
  ) {
    super();
  }

  private mapError(error: Error, response: HttpResponse) {
    switch (error.constructor) {
      case PokemonNotFoundError:
        response.status(404).json({ message: error.message });
        break;
      default:
        response.status(400).json(error);
        break;
    }
  }

  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      const result = await this.usecase.execute(request.params as GetPokemonRequest);
      response.status(200).json(result);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
