import dotenv from 'dotenv';
import http from 'http';
import { handleRequest } from './router/routes';
dotenv.config();

const port = Number(process.env.PORT);
const host = 'localhost';

export const server = http.createServer(handleRequest);
server.listen(port, host, () => {
  console.log(`Server is started on port: ${port}`);
});
