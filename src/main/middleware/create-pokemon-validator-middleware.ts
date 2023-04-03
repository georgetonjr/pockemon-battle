import { CreatePokemonRequest } from '@usecases/create-pokemon/domain/create-pokemon-request';
import { NextFunction ,Request ,Response  } from 'express';
import Joi from 'joi';

export const CreatePokemonValidator = (req: Request, res: Response, next: NextFunction) => {
  const CreatePokemonSchema = Joi.object<CreatePokemonRequest>().keys({
    tipo: Joi.string().required(),
    treinador: Joi.string().valid('charizard', 'mewtwo', 'pikachu').required(),
  });
  const { error } = CreatePokemonSchema.validate(req.body)  
  if (error) {
    return res.status(400).json(error.details);
  }

  next();
};
