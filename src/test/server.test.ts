import request from 'supertest';
import { server } from '../index';
import { IUser } from '../interface/User';
import { ICodes } from '../interface/Codes';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

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

describe('Different methods', () => {
  const users: IUser[] = [];

  test('should return empty array', async () => {
    const response = await request(server)
      .get('/api/users')
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(ICodes.OK);
    expect(response.headers['content-type']).toEqual('application/json');
    expect(response.body).toBeDefined();
    expect(response.body.length).toEqual(users.length);
  });
  test('should create  new user', async () => {
    const newUser = {
      username: 'Ryhor',
      age: 40,
      hobbies: ['bla bla', 'tuk tuk'],
    };

    const response = await request(server)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(ICodes.CREATED);
    expect(response.headers['content-type']).toEqual('application/json');
    expect(response.body).toBeDefined();
    expect(response.body.id).toBeDefined();
    expect(response.body.username).toEqual(newUser.username);
    expect(response.body.age).toEqual(newUser.age);
    expect(response.body.hobbies).toEqual(newUser.hobbies);
  });

  test('should get user by userId', async () => {
    const newUser = {
      username: 'Ryhor',
      age: 40,
      hobbies: ['bla bla', 'tuk tuk'],
    };

    const response = await request(server)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json');

    const userId = response.body.id;

    const responseGetUser = await request(server)
      .get(`/api/users/${userId}`)
      .set('Accept', 'application/json');

    expect(responseGetUser.statusCode).toEqual(ICodes.OK);
    expect(responseGetUser.body).toBeDefined();
    expect(responseGetUser.body.id).toEqual(userId);
    expect(responseGetUser.body.username).toEqual(newUser.username);
    expect(responseGetUser.body.age).toEqual(newUser.age);
    expect(responseGetUser.body.hobbies).toEqual(newUser.hobbies);
  });

  test('should update user by userId', async () => {
    const newUser = {
      username: 'Ryhor',
      age: 40,
      hobbies: ['bla bla', 'tuk tuk'],
    };

    const response = await request(server)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json');

    const userId = response.body.id;

    const updatedUserData = {
      username: 'Vasy',
      age: 50,
      hobbies: ['ly ly', 'topaly'],
    };

    const updateResponse = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUserData)
      .set('Accept', 'application/json');

    expect(updateResponse.statusCode).toEqual(ICodes.OK);
    expect(updateResponse.body).toBeDefined();
    expect(updateResponse.body.id).toEqual(userId);
    expect(updateResponse.body.username).toEqual(updatedUserData.username);
    expect(updateResponse.body.age).toEqual(updatedUserData.age);
    expect(updateResponse.body.hobbies).toEqual(updatedUserData.hobbies);
  });

  test('should delete user by userId', async () => {
    const newUser = {
      username: 'Ryhor',
      age: 40,
      hobbies: ['bla bla', 'tuk tuk'],
    };

    const response = await request(server)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json');

    const userId = response.body.id;

    const deleteResponse = await request(server)
      .delete(`/api/users/${userId}`)
      .set('Accept', 'application/json');

    expect(deleteResponse.statusCode).toEqual(ICodes.FOUND_DELETED);
  });
});

describe('invalid values', () => {
  const users: IUser[] = [];

  test('should return error where invalid address', async () => {
    const response = await request(server)
      .get('/api/userswww')
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(ICodes.NOT_FOUND);
    expect(response.text).toEqual('404 Not Found');
  });

  test('should create new user with invalid data', async () => {
    const newUser = {
      username: '',
      age: -10,
      hobbies: ['bla bla', 123],
    };

    const response = await request(server)
      .post('/api/users')
      .send(newUser)
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(ICodes.BAD_REQUEST);
  });

  test('should get user by invalid userId', async () => {
    const invalidUserId = '12345';

    const response = await request(server)
      .get(`/api/users/${invalidUserId}`)
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(ICodes.BAD_REQUEST);
  });

  test('should update user with invalid userId', async () => {
    const invalidUserId = uuidv4();

    const updatedUserData = {
      username: 'Vasy',
      age: 50,
      hobbies: ['ly ly', 'topaly'],
    };

    const response = await request(server)
      .put(`/api/users/${invalidUserId}`)
      .send(updatedUserData)
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(ICodes.NOT_FOUND);
  });

  test('should delete user with invalid userId', async () => {
    const invalidUserId = uuidv4();

    const response = await request(server)
      .delete(`/api/users/${invalidUserId}`)
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(ICodes.NOT_FOUND);
  });
});
