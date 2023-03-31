import { Controller } from '@adapters/port/controller';
import { HttpRequest } from '@adapters/port/http-request';
import { HttpResponse } from '@adapters/port/http-response';
import { UpdatePokemonRequest } from '@usecases/update-pokemon/domain/update-pokemon-request';
import { UpdatePokemonUsecase } from '@usecases/update-pokemon/update-pokemon-usecase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdatePokemonController extends Controller {
  constructor(
    @inject('UpdatePokemonUsecase')
    private usecase: UpdatePokemonUsecase,
  ) {
    super();
  }
  
  private mapError(error: Error, response: HttpResponse) {
    switch (error.message) {
      case 'Pokemon not found':
        response.status(404).json({ message: error.message });
        break;
      default:
        response.status(400).json(error);
        break;
    }
  }

  async handle(request: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      const payload = {
        ... request.params,
        ... request.body,
      } as UpdatePokemonRequest;

      await this.usecase.execute(payload);  
      response.sendStatus(204);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
