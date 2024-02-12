import { ServerResponse, IncomingMessage } from 'http';
import { ICodes } from '../interface/Codes';
import { IUser } from '../interface/User';
import { users } from '../data/database';

import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export function updateUser(req: IncomingMessage, res: ServerResponse) {
  try {
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

    const userIndex = users.findIndex((user) => user.id === userId);
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const userData: Partial<IUser> = JSON.parse(body);
        if (
          !(typeof userData.username === 'string') ||
          !userData.username.trim() ||
          !(typeof userData.age === 'number') ||
          !userData.hobbies ||
          !Array.isArray(userData.hobbies) ||
          userData.hobbies.some(
            (hobby: string) =>
              typeof hobby !== 'string' || hobby.trim().length === 0
          )
        ) {
          res.writeHead(ICodes.BAD_REQUEST, { 'Content-Type': 'text/plain' });
          res.end('Fields are filled in incorrectly');
          return;
        }

        const updatedUser = { ...users[userIndex], ...userData };
        users[userIndex] = updatedUser;

        res.writeHead(ICodes.OK, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
      } catch (error) {
        res.writeHead(ICodes.BAD_REQUEST, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON');
      }
    });
  } catch (error) {
    res.writeHead(ICodes.SERVER_ERROR, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
}
