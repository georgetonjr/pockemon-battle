export class PokemonNotFoundError extends Error {
  constructor() {
    super('PokemonNotFound');
    this.name = 'Pokemon not found';
    this.message = 'Pokemon not found';
  }
}
