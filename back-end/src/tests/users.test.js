/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');
const { User } = require('../database/models');
const { admin, customer, seller, users } = require('./mocks/usersMock');

chai.use(chaiHttp);

const { expect } = chai;

const login = async (user) => {
  let body;
  if (user.role === 'customer') body = { email: 'customer@deliveryapp.com', password: '123123' };
  else if (user.role === 'seller') body = { email: 'seller@deliveryapp.com', password: '123123' };
  else if (user.role === 'admin') body = { email: 'admin@deliveryapp.com', password: '123123' };
  sinon.stub(User, 'findOne').returns(user);
  const response = await chai.request(server).post('/users/login').send(body);
  User.findOne.restore();
  return response.body.token;
};

describe('Tests on route /users/login', () => {
  let response;

  describe('POST method', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('Validates the user data passed in the request body', async () => {
      sinon.stub(User, 'findOne').returns(null);
      response = await chai.request(server).post('/users/login').send({
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('Wrong credentials');
    });

    it('Returns the user data and the auth token', async () => {
      sinon.stub(User, 'findOne').returns(customer);
      response = await chai.request(server).post('/users/login').send({
        email: 'customer@deliveryapp.com',
        password: '123123',
      });

      expect(response).to.have.status(200);
      expect(response.body).to.have.ownProperty('id');
      expect(response.body).to.have.ownProperty('email');
      expect(response.body).to.have.ownProperty('name');
      expect(response.body).to.have.ownProperty('role');
      expect(response.body).to.have.ownProperty('token');
    });
  });
});

describe('Tests on route /users/:id/role', () => {
  let response, token;

  describe('PATCH method', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('Validates if the logged in user is admin', async () => {
      token = await login(customer);
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .patch('/users/1/role')
        .send({ role: 'seller' })
        .set('token', token);

      expect(response).to.have.status(403);
      expect(response.body.message).to.be.equal('Forbidden access');
    });

    it('Validates the role passed in the request body', async () => {
      token = await login(admin);
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .patch('/users/1/role')
        .send({ role: 'some role' })
        .set('token', token);

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('Invalid role');
    });

    it('Validates if the user exists', async () => {
      token = await login(admin);
      sinon.stub(User, 'findOne').returns(null);
      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .patch('/users/999/role')
        .send({
          role: 'seller',
        })
        .set('token', token);

      expect(response).to.have.status(404);
      expect(response.body.message).to.be.equal('User not found');
    });

    it('Updates the user role and returns status code 200', async () => {
      token = await login(admin);
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .patch('/users/1/role')
        .send({
          role: 'seller',
        })
        .set('token', token);

      expect(response).to.have.status(200);
    });
  });
});

describe('Tests on route /users/:id', () => {
  let response, token;

  describe('GET method', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('Validates if the logged in user is admin or has the same id', async () => {
      token = await login(seller);
      sinon.stub(User, 'findOne').returns(customer);
      response = await chai.request(server).get('/users/1').set('token', token);

      expect(response).to.have.status(403);
      expect(response.body.message).to.be.equal('Forbidden access');
    });

    it('Validates if the user exists', async () => {
      token = await login(admin);
      sinon.stub(User, 'findOne').returns(null);
      response = await chai.request(server).get('/users/999').set('token', token);

      expect(response).to.have.status(404);
      expect(response.body.message).to.be.equal('User not found');
    });

    it('Returns the user information', async () => {
      token = await login(customer);
      sinon.stub(User, 'findOne').returns(customer);
      response = await chai.request(server).get('/users/1').set('token', token);

      expect(response).to.have.status(200);
      expect(response.body).to.have.ownProperty('id');
      expect(response.body).to.have.ownProperty('email');
      expect(response.body).to.have.ownProperty('name');
      expect(response.body).to.have.ownProperty('role');
    });
  });

  describe('PUT method', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('Validates the email passed in the request body', async () => {
      token = await login(customer);
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .put('/users/1')
        .send({
          name: 'John Doe',
          email: 'johndoegmail.com',
          password: '123456',
        })
        .set('token', token);

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('Invalid email');
    });

    it('Validates the password passed in the request body', async () => {
      token = await login(customer);
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .put('/users/1')
        .send({
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: '12345',
        })
        .set('token', token);

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('Invalid password');
    });

    it('Validates the name passed in the request body', async () => {
      token = await login(customer);
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .put('/users/1')
        .send({
          name: 'John',
          email: 'johndoe@gmail.com',
          password: '123456',
        })
        .set('token', token);

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('Invalid name');
    });

    it('Validates if the user exists', async () => {
      token = await login(admin);
      sinon.stub(User, 'findOne').returns(null);
      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .put('/users/999')
        .send({
          name: 'John Doe',
          email: 'customer@deliveryapp.com',
          password: '123456',
        })
        .set('token', token);

      expect(response).to.have.status(404);
      expect(response.body.message).to.be.equal('User not found');
    });

    it('Updates the user data and returns status code 200', async () => {
      token = await login(customer);
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .put('/users/1')
        .send({
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: '123456',
        })
        .set('token', token);

      expect(response).to.have.status(200);
    });
  });

  describe('DELETE method', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('Validates if the logged in user is admin or has the same id', async () => {
      token = await login(seller);
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'destroy').returns();
      response = await chai.request(server).delete('/users/1').set('token', token);

      expect(response).to.have.status(403);
      expect(response.body.message).to.be.equal('Forbidden access');
    });

    it('Validates if the user exists', async () => {
      token = await login(admin);
      sinon.stub(User, 'findOne').returns(null);
      sinon.stub(User, 'destroy').returns();
      response = await chai.request(server).delete('/users/999').set('token', token);

      expect(response).to.have.status(404);
      expect(response.body.message).to.be.equal('User not found');
    });

    it('Deletes the user data and returns status code 200', async () => {
      token = await login(customer);
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'destroy').returns();
      response = await chai.request(server).delete('/users/1').set('token', token);

      expect(response).to.have.status(200);
    });
  });
});

describe('Tests on route /users', () => {
  let response, token;

  describe('GET method', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('Validates if the logged in user is admin', async () => {
      token = await login(customer);
      sinon.stub(User, 'findAll').returns(users);
      response = await chai.request(server).get('/users').set('token', token);

      expect(response).to.have.status(403);
      expect(response.body.message).to.be.equal('Forbidden access');
    });

    it('Returns an array with the user records', async () => {
      token = await login(admin);
      sinon.stub(User, 'findAll').returns(users);
      response = await chai.request(server).get('/users').set('token', token);

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf(3);
    });
  });

  describe('POST method', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('Validates the email passed in the request body', async () => {
      sinon.stub(User, 'findOne').returns(null);
      sinon.stub(User, 'create').returns({ id: 999 });
      response = await chai.request(server).post('/users').send({
        name: 'John Doe',
        email: 'johndoegmail.com',
        password: '123456',
      });

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('Invalid email');
    });

    it('Validates the password passed in the request body', async () => {
      sinon.stub(User, 'findOne').returns(null);
      sinon.stub(User, 'create').returns({ id: 999 });
      response = await chai.request(server).post('/users').send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '12345',
      });

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('Invalid password');
    });

    it('Validates the name passed in the request body', async () => {
      sinon.stub(User, 'findOne').returns(null);
      sinon.stub(User, 'create').returns({ id: 999 });
      response = await chai.request(server).post('/users').send({
        name: 'John',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('Invalid name');
    });

    it('Validates if the user does not exist', async () => {
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'create').returns({ id: 999 });
      response = await chai.request(server).post('/users').send({
        name: 'John Doe',
        email: 'customer@deliveryapp.com',
        password: '123456',
      });

      expect(response).to.have.status(409);
      expect(response.body.message).to.be.equal('User already exists');
    });

    it('Creates a new record and returns the correct information', async () => {
      sinon.stub(User, 'findOne').returns(null);
      sinon.stub(User, 'create').returns({ id: 999 });
      response = await chai.request(server).post('/users').send({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      });

      expect(response).to.have.status(201);
      expect(response.body).to.haveOwnProperty('id');
    });
  });
});
