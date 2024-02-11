import { IncomingMessage, ServerResponse } from 'http';
import { addUser, getAllUsers, getUser } from './functions';

export function handleRequest(req: IncomingMessage, res: ServerResponse) {
  if (
    req.method === 'GET' &&
    (req.url === '/api/users' || req.url === '/api/users/')
  ) {
    getAllUsers(req, res);
  } else if (req.method === 'POST' && req.url === '/api/users') {
    addUser(req, res);
  } else if (req.method === 'GET' && req.url.startsWith('/api/users/')) {
    getUser(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
}
