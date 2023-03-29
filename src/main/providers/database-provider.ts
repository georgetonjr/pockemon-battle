import { sequelizeConnection } from '../../external/orm';

export default async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.log('Database not connected!');
    console.log(error);
  }
};
