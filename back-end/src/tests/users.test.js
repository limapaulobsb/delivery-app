/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const server = require('../api/app');
const { User } = require('../database/models');
const { admin, customer, users } = require('./mocks/usersMock');

chai.use(chaiHttp);

const { expect } = chai;

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

    it('Returns the user information and the auth token', async () => {
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
  let response;

  describe('PATCH method', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('Validates if the logged in user is admin', async () => {
      sinon.stub(User, 'findOne').returns(customer);
      response = await chai.request(server).post('/users/login').send({
        email: 'customer@deliveryapp.com',
        password: '123123',
      });
      token = response.body.token;

      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .patch('/users/1/role')
        .send({
          role: 'seller',
        })
        .set('token', token);

      expect(response).to.have.status(403);
      expect(response.body.message).to.be.equal('Forbidden access');
    });

    it('Validates the role passed in the request body', async () => {
      sinon.stub(User, 'findOne').returns(admin);
      response = await chai.request(server).post('/users/login').send({
        email: 'admin@deliveryapp.com',
        password: '123123',
      });
      token = response.body.token;

      User.findOne.restore();
      sinon.stub(User, 'findOne').returns(customer);
      sinon.stub(User, 'update').returns();
      response = await chai
        .request(server)
        .patch('/users/1/role')
        .send({
          role: 'some role',
        })
        .set('token', token);

      expect(response).to.have.status(400);
      expect(response.body.message).to.be.equal('Invalid role');
    });

    it('Validates if the user exists', async () => {
      sinon.stub(User, 'findOne').returns(admin);
      response = await chai.request(server).post('/users/login').send({
        email: 'admin@deliveryapp.com',
        password: '123123',
      });
      token = response.body.token;

      User.findOne.restore();
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

    it('Updates user role and returns status code 200', async () => {
      sinon.stub(User, 'findOne').returns(admin);
      response = await chai.request(server).post('/users/login').send({
        email: 'admin@deliveryapp.com',
        password: '123123',
      });
      token = response.body.token;

      User.findOne.restore();
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

describe('Tests on route /users', () => {
  let response, token;

  describe('GET method', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('Validates if the logged in user is admin', async () => {
      sinon.stub(User, 'findOne').returns(customer);
      response = await chai.request(server).post('/users/login').send({
        email: 'customer@deliveryapp.com',
        password: '123123',
      });
      token = response.body.token;

      sinon.stub(User, 'findAll').returns(users);
      response = await chai.request(server).get('/users').set('token', token);

      expect(response).to.have.status(403);
      expect(response.body.message).to.be.equal('Forbidden access');
    });

    it('Returns an array with the user records', async () => {
      sinon.stub(User, 'findOne').returns(admin);
      response = await chai.request(server).post('/users/login').send({
        email: 'admin@deliveryapp.com',
        password: '123123',
      });
      token = response.body.token;

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
      sinon.stub(User, 'findOne').returns(users[0]);
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
