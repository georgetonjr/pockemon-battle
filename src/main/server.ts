import 'reflect-metadata';
import '@external/dependency-injection/container';
import { app } from './app';
import { config } from './config';

(async (): Promise<void> => {
  const serverApp = await app();

  serverApp.listen(config.SERVER_PORT, () => {
    console.log(`Server is running on  http://localhost:${config.SERVER_PORT}`);
  });
})();
