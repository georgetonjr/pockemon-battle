export class PokemonNotFoundError extends Error {
  constructor(message?: string) {
    super('PokemonNotFound');
    this.name = 'Pokemon not found';
    this.message = 'Pokemon not found';
  }
}
