import { Controller } from '@adapters/port/controller';
import { HttpRequest } from '@adapters/port/http-request';
import { HttpResponse } from '@adapters/port/http-response';
import { PokemonNotFoundError } from '@usecases/errors/pokemon-not-found-error';
import { PokemonBattleUsecase } from '@usecases/pokemon-battle/pokemon-battle-usecase';
import { inject, injectable } from 'tsyringe';

@injectable()
export class PokemonBattleController extends Controller {
  constructor(
    @inject('PokemonBattleUsecase')
    private usecase: PokemonBattleUsecase,
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
      const payload = request.params as { pokemonAId: string; pokemonBId: string };
      const result = await this.usecase.execute({ 
        pokemonAId: Number(payload.pokemonAId), 
        pokemonBId: Number(payload.pokemonBId), 
      });
      
      response.status(200).json(result);
    } catch (error) {
      this.mapError(error, response);
    }
  }
}
