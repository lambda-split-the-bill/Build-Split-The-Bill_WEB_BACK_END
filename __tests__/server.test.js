const request = require('supertest');
const server = require("../api/server");
const db = require('../data/dbConfig.js');

describe('server.js', () => {
  describe('index', () => {
    it('should return an OK status code from the index route', async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expectedStatusCode);

    });

    it('should return a JSON object', async () => {
      const expectedBody = { api: 'running' };
      const response = await request(server).get('/');
      expect(response.body).toEqual(expectedBody);
    });

    it('should return a JSON object fron the index route', async () => {
      const response = await request(server).get('/');
      expect(response.type).toEqual('application/json');
    });
  });
});

describe('server', () => {

  afterAll(async() => {
      await db('users').truncate();
  })

  it('respond with 201 - post - add user', done => {
      supertest(server)
          .post('/register')
          .send({username: 'test1234', password: '1234'})
          .expect(201)
          .expect('Content-Type', /json/i, done)
      }) 

  it('respond with 200 OK - get - root', () => {
      return supertest(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/i)
  })

  it('respond with 200 - get - getById', () => {
          supertest(server)
          .get('/1')
          .expect(200)
          .expect('Content-Type', /json/i)
      })

  it('respond with 200 - put - update user', () => {
      supertest(server)
      .put('/1')
      .send({username: "test12345", password: "1234"})
      .expect(200)
      .expect('Content-Type', /json/i)
  })    

  it('respond with 200 - get - get all users', () => {
      supertest(server)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/i)
  })

  it('respond with 200 - delete - remove user', () => {
      supertest(server)
      .delete('/1')
      .expect(200)
      .expect('Content-Type', /json/i)
  })

 
})