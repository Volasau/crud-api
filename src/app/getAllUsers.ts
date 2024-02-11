import { ServerResponse, IncomingMessage } from 'http';
import { users } from '../data/database';
import { ICodes } from '../interface/Codes';

export function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(ICodes.OK, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}
