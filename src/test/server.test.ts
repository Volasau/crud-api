import request from 'supertest';
import { server } from '../index';
import { IUser } from '../interface/User';
import { ICodes } from '../interface/Codes';

describe('Server', () => {
  const users: IUser[] = [];

  test('should respond with status code 200', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
  });
  test('should respond with status code 404', async () => {
    const response = await request(server).get('/api/usersqq');
    expect(response.status).toBe(404);
  });

  test('should respond with JSON content type', async () => {
    const response = await request(server).get('/api/users');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('should return empty array', async () => {
    const response = await request(server)
      .get('/api/users')
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(ICodes.OK);
    expect(response.headers['content-type']).toEqual('application/json');
    expect(response.body).toBeDefined();
    expect(response.body.length).toEqual(users.length);
  });
});
