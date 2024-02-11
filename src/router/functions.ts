import { ServerResponse, IncomingMessage } from 'http';
import { ICodes } from '../interface/Codes';
import { IUser } from '../interface/User';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

const users: IUser[] = [];

//Тестовый ЮЗЕР
users.push({
  id: uuidv4(),
  username: 'Ryhor',
  age: 40,
  hobbies: ['bla bla', 'tuk tuk'],
});

export function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(ICodes.OK, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

export function addUser(req: IncomingMessage, res: ServerResponse) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userData = JSON.parse(body);

      if (
        !userData.username ||
        !userData.age ||
        !userData.hobbies ||
        !Array.isArray(userData.hobbies)
      ) {
        res.writeHead(ICodes.BAD_REQUEST, { 'Content-Type': 'text/plain' });
        res.end('Missing required fields');
        return;
      }

      const newUser: IUser = {
        id: uuidv4(),
        username: userData.username,
        age: userData.age,
        hobbies: userData.hobbies,
      };

      users.push(newUser);

      res.writeHead(ICodes.CREATED, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.writeHead(ICodes.BAD_REQUEST, { 'Content-Type': 'text/plain' });
      res.end('Invalid JSON');
    }
  });
}

export function getUser(req: IncomingMessage, res: ServerResponse) {
  const urlParts = req.url.split('/');
  const userId = urlParts[urlParts.length - 1];
  if (!uuidValidate(userId)) {
    res.writeHead(ICodes.BAD_REQUEST, { 'Content-Type': 'text/plain' });
    res.end('Invalid userId');
    return;
  }
  const user = users.find((user) => user.id === userId);
  if (!user) {
    res.writeHead(ICodes.NOT_FOUND, { 'Content-Type': 'text/plain' });
    res.end('User not found');
    return;
  }
  res.writeHead(ICodes.OK, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
}
