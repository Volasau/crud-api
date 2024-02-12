import request from 'supertest';
import { server } from '../index';

describe('Server', () => {
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
});
