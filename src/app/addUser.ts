import { ServerResponse, IncomingMessage } from 'http';
import { users } from '../data/database';
import { ICodes } from '../interface/Codes';
import { IUser } from '../interface/User';
import { v4 as uuidv4 } from 'uuid';

export function addUser(req: IncomingMessage, res: ServerResponse) {
  try {
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
  } catch (error) {
    res.writeHead(ICodes.SERVER_ERROR, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
}
