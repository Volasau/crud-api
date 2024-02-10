import dotenv from 'dotenv';
import http from 'http';
import { ICodes } from './interface/Codes';
import { IUser } from './interface/User';
dotenv.config();

const port = Number(process.env.PORT);
const host = 'localhost';

const user: IUser = {
  id: '123',
  username: 'Ryhor',
  age: 40,
  hobbies: ['bla bla', 'tuk tuk'],
};

const server = http.createServer((req, res) => {
  if (
    req.method === 'GET' &&
    (req.url === '/api/users' || req.url === '/api/users/')
  ) {
    res.writeHead(ICodes.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(ICodes.NOT_FOUND, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(port, host, () => {
  console.log(`Server is started on port: ${port}`);
});
