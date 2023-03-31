import { HttpRequest } from './http-request';
import { HttpResponse } from './http-response';

abstract class Controller {
  abstract handle(request: HttpRequest, response: HttpResponse): Promise<void>;
}

export { Controller };
