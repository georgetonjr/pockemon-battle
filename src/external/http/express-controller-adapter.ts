import { Request, Response } from 'express';
import { Controller } from '@adapters/port/controller';
import { HttpRequest } from '@adapters/port/http-request';

export const adapterController = (controller: Controller) =>
  async (request: Request, response: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: request.body,
      headers: request.headers,
      params: request.params,
      query: request.query,
    };
    await controller.handle(httpRequest, response);
  };
