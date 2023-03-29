import databaseProvider from './database-provider';

export default async () => {
  try {
    await databaseProvider();
  } catch (error) {
    console.log(error);
  }
};
