/**
 * @author Ajantha Bandara
 * @description All the validation are implemented here using Joi library
 */

import Joi from 'joi';
import { User } from '../models/user';

// validations for user object
export const validateUser = (user: User) => {
  const userSchema = {
    firstName: Joi.string()
      .required().description('First Name Required'),
    lastName: Joi.string()
      .required().description('Last Name Required'),
    username: Joi.string()
      .required().description('Username Required'),
    id: Joi.number().optional()
  }

  return Joi.validate(user, userSchema);
}

// validate userId
export const validateUserId = (userId: number) => {
  const userIdSchema = Joi.number()
    .required().description('UserId required');
  
  return Joi.validate(userId, userIdSchema);
}

// return extracted validation errors 
export const getJoiValidationErrors = (validationObj: any) => {
  if (validationObj && validationObj.error != null) {
    const errors = validationObj.error;

    return {
      error: true,
      name: errors.name,
      message: errors.details
    };
  }
}

