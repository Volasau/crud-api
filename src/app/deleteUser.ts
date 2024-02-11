import { ServerResponse, IncomingMessage } from 'http';
import { ICodes } from '../interface/Codes';
import { users } from '../data/database';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export function deleteUser(req: IncomingMessage, res: ServerResponse) {
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
    users.splice(userIndex, 1);

    res.writeHead(ICodes.FOUND_DELETED, { 'Content-Type': 'text/plain' });
    res.end('User deleted');
  } catch (error) {
    res.writeHead(ICodes.SERVER_ERROR, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
}
