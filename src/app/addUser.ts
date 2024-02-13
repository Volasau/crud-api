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

        const requiredKeys = ['username', 'age', 'hobbies'];

        const missingKeys = requiredKeys.filter((key) => !(key in userData));
        const extraKeys = Object.keys(userData).filter(
          (key) => !requiredKeys.includes(key)
        );

        if (missingKeys.length > 0) {
          res.writeHead(ICodes.BAD_REQUEST, { 'Content-Type': 'text/plain' });
          res.end(`Missing fields: ${missingKeys.join(', ')}`);
          return;
        }

        if (extraKeys.length > 0) {
          res.writeHead(ICodes.BAD_REQUEST, { 'Content-Type': 'text/plain' });
          res.end('Extra fields are present');
          return;
        }

        const checkHobbis =
          userData.hobbies instanceof Array &&
          (userData.hobbies.length === 0 ||
            userData.hobbies.every(
              (hobby: string) => typeof hobby === 'string'
            ));

        if (
          !(typeof userData.username === 'string') ||
          !userData.username.trim() ||
          !(typeof userData.age === 'number') ||
          !userData.hobbies ||
          !checkHobbis
        ) {
          res.writeHead(ICodes.BAD_REQUEST, { 'Content-Type': 'text/plain' });
          res.end('Fields are filled in incorrectly');
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
