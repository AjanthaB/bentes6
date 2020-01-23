/**
 * @author Ajantha Bandara
 */
import { Request, Response } from 'express';
// import regeneratorRuntime from "regenerator-runtime";
const Excel = require('exceljs');

import { User } from '../models/user';

import * as Validators from '../services/validation.service';

// temporary users
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

// update existing user
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

export const generateExcel = async (req: Request, res: Response): any => {
  const workbook = new Excel.Workbook(); //create object of workbook
  const ws = workbook.addWorksheet('TestData');
  // use write file function to create new file
  ws.getCell(1,1).value = 'Test val';
  ws.getCell(1, 1).note = {texts: [{text: 'New Comment'}]};
  
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  return workbook.xlsx.write(res)
    .then(() => {
      res.end();
      console.log("excel file created successfully");
    }, (err: any) => {
      console.log(err);
      res.json({error: true});
    });
}
