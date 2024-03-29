import { IncomingMessage, ServerResponse } from 'http';
import { ICodes } from '../interface/Codes';
import { getAllUsers } from '../app/getAllUsers';
import { addUser } from '../app/addUser';
import { getUser } from '../app/getUser';
import { updateUser } from '../app/updateUser';
import { deleteUser } from '../app/deleteUser';

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
  try {
    if (req.method === 'GET' && req.url === '/api/users') {
      getAllUsers(req, res);
    } else if (req.method === 'POST' && req.url === '/api/users') {
      addUser(req, res);
    } else if (req.method === 'GET' && req.url.startsWith('/api/users/')) {
      getUser(req, res);
    } else if (req.method === 'PUT' && req.url.startsWith('/api/users/')) {
      updateUser(req, res);
    } else if (req.method === 'DELETE' && req.url.startsWith('/api/users/')) {
      deleteUser(req, res);
    } else {
      res.writeHead(ICodes.NOT_FOUND, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  } catch (error) {
    res.writeHead(ICodes.SERVER_ERROR, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
}
