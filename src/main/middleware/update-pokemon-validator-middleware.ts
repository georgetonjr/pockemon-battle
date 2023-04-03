import { UpdatePokemonRequest } from '@usecases/update-pokemon/domain/update-pokemon-request';
import { NextFunction ,Request ,Response  } from 'express';
import Joi from 'joi';

export const UpdatePokemonValidator = (req: Request, res: Response, next: NextFunction) => {
  const updatePokemonSchema = Joi.object<UpdatePokemonRequest>().keys({
    treinador: Joi.string().valid('charizard', 'mewtwo', 'pikachu').required(),
  });
  const { error } = updatePokemonSchema.validate(req.body)  
  if (error) {
    return res.status(400).json(error.details);
  }

  next();
};
