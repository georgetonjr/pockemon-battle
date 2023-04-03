import { CreatePokemonRequest } from '@usecases/create-pokemon/domain/create-pokemon-request';
import { NextFunction ,Request ,Response  } from 'express';
import Joi from 'joi';

export const CreatePokemonValidator = (req: Request, res: Response, next: NextFunction) => {
  const CreatePokemonSchema = Joi.object<CreatePokemonRequest>().keys({
    tipo: Joi.string().valid('charizard', 'mewtwo', 'pikachu').required(),
    treinador: Joi.string().required(),
  });
  const { error } = CreatePokemonSchema.validate(req.body)  
  if (error) {
    return res.status(400).json(error.details);
  }

  next();
};
