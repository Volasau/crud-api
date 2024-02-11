import { IUser } from '../interface/User';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export const users: IUser[] = [];

//Тестовый ЮЗЕР
// users.push({
//   id: uuidv4(),
//   username: 'Ryhor',
//   age: 40,
//   hobbies: ['bla bla', 'tuk tuk'],
// });
