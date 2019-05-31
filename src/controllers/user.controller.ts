/**
 * @author Ajantha Bandara
 */
import { Request, Response } from 'express'

import { User } from '../models/user';

import * as Validators from '../services/validation.service';

// temporaty users
let users: User[] = [];

// get all the user from database
export const getUsers = (req: Request, res: Response): any => {
  return res.status(200)
    .json(users);
}

// create new user
export const creteUser = (req: Request, res: Response): any => {
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
export const updateUser = (req: Request, res: Response): any => {
  console.log(req.body);
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
export const deleteUser = (req: Request, res: Response): any => {
  const userId: number = req.query.id;
  const validationResult = Validators.validateUserId(userId);
  
  if (validationResult.error) {
    return res.status(400)
      .json(Validators.getJoiValidationErrors(validationResult));
  }
  console.log("userid: ", userId);
  users = users.filter((user: User) => user.id != userId);
  return res.status(200)
    .json();
}