# crud-api

## Technical requirements

- Use 20 LTS version of Node.js

### Install packages

```
npm install
```

### Run in development mode

```
npm run start:dev
```

### Run in producion mode

```
npm run start:prod
```

### Run in production mode with load balancer

```
npm run start:multi
```

### Run test

## start the server before the tests

```
npm run start:dev
```

```
npm run start:prod
```

## Run the tests

```
npm run test
```

### Endpoints

GET `http://localhost:4000/api/users` is used to get all users

GET `http://localhost:4000/api/users/${userId}` is used to get particular user by ID

POST `http://localhost:4000/api/users` is used to create record about new user and store it in database

PUT `http://localhost:4000/api/users/${userId}` is used to update existing user

DELETE `http://localhost:4000/api/users/${userId}` is used to delete existing user from database

### Example of an object User

```
{

    username: 'Ryhor',
    age: 40,
    hobbies: ['bla bla', 'tuk tuk'],

}
```
