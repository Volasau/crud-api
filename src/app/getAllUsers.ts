import { ServerResponse, IncomingMessage } from 'http';
import { users } from '../data/database';
import { ICodes } from '../interface/Codes';

export function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    res.writeHead(ICodes.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(ICodes.SERVER_ERROR, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
}
