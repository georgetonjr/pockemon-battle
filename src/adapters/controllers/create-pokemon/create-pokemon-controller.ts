import { Controller } from '@adapters/port/controller';
import { HttpRequest } from '@adapters/port/http-request';
import { HttpResponse } from '@adapters/port/http-response';
import { CreatePokemonUsecase } from '@usecases/create-pokemon/create-pokemon-usecase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreatePokemonController extends Controller {
  constructor(
    @inject('CreatePokemonUsecase')
    private usecase: CreatePokemonUsecase,
  ) {
    super();
  }

  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      const payload = request.body as { tipo: string; treinador: string };
      const result = await this.usecase.execute(payload);
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
