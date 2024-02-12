import dotenv from 'dotenv';
import cluster from 'cluster';
import http from 'http';
import os from 'os';
import { handleRequest } from './router/routes';
import { IUser } from './interface/User';

dotenv.config();

const users: IUser[] = [];

const cpus = os.cpus().length;

const port = Number(process.env.PORT) || 7;

if (cluster.isPrimary) {
  for (let i = 0; i < cpus - 1; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const PORT = port + cluster.worker.id;
  const server = http.createServer((req, res) => {
    handleRequest(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Worker ${cluster.worker.id} listening on port ${PORT}`);
  });
}
