/**
 * @author Ajantha Bandara
 */

import { User } from '../models/user';

import * as Validators from '../services/validation.service';

// temporaty users
let users: User[] = [{
  firstName: 'Ajantha',
  lastName: 'Bandata',
  username: 'ajanthab',
  id: Math.random()
}];

// get all the user from database
export const getUsers = (req: any, res: any): any => {
  return res.status(200)
    .json(users);
}

// create new user
export const creteUser = (req: any, res: any): any => {
  const user: User = { ...req.body, id: Math.random() };
  const validationResult = Validators.validateUser(user);
  
  if (validationResult.error) {
    return res.status(400)
      .json(Validators.getJoiValidationErrors(validationResult));
  }

  users.push(user);
  return res.status(201)
    .json(user);
}

// updare existing user
export const updateUser = (req: any, res: any): any => {
  const user: User = req.body;
  const validationResult = Validators.validateUser(user);

  if (validationResult.error) {
    return res.status(400)
      .json(Validators.getJoiValidationErrors(validationResult));
  }

  users = users
    .map((usr: User) => usr.id === user.id ? user : usr);
  
  return res.status(200)
    .json(user);
}

// delete existing user
export const deleteUser = (req: any, res: any): any => {
  const userId: number = req.query.id;
  const validationResult = Validators.validateUserId(userId);
  
  if (validationResult.error) {
    return res.status(400)
      .json(Validators.getJoiValidationErrors(validationResult));
  }

  users = users.filter((user: User) => user.id != userId);
  return res.status(200)
    .json();
}