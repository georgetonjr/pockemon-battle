import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { Controller } from '@adapters/port/controller';
import { HttpResponse } from '@adapters/port/http-response';
import { ListPokemonUsecase } from '@usecases/list-pokemons/list-pokemon-usecase';
import { HttpRequest } from '@adapters/port/http-request';

@injectable()
export class ListPokemonController extends Controller {
  constructor(
    @inject('ListPokemonUsecase')
    private usecase: ListPokemonUsecase,
  ) {
    super();
  }
  
  async handle(_: HttpRequest, response: HttpResponse): Promise<void> {
    try {
      const result = await this.usecase.execute();
      response.status(200).json(result);
    } catch (error) {
      response.status(400).json(error);
    }
  }
}
