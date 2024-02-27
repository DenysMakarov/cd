require('dotenv').config({path: `.env.test`})
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const httpMocks = require('node-mocks-http');
const userController = require('../src/controllers/user.controller');
const userService = require('../src/services/user.service');
const { expectedUsers } = require('./mock');

describe('UserController', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('findAllUsers', () => {
    it('should return status 200 and all users', async () => {
      sinon.stub(userService, 'findAllUsers').resolves(expectedUsers);
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = sinon.spy();

      await userController.findAllUsers(req, res, next);
      expect(res.statusCode).to.equal(400);
      expect(JSON.parse(res._getData())).to.deep.equal(expectedUsers);
    });

    it('should handle errors and return status 500', async () => {
      sinon.stub(userService, 'findAllUsers').rejects(new Error('Test error'));
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = sinon.spy();

      await userController.findAllUsers(req, res, next);
      expect(next.calledOnce).to.be.true;
    });
  });

  describe('findUserByName', () => {
    it('should return status 200 and the user details when found', async () => {
      const user = expectedUsers[0];
      sinon.stub(userService, 'findUserByName').resolves(user);
      const req = httpMocks.createRequest({
        params: {
          name: user.name
        }
      });
      const res = httpMocks.createResponse();
      const next = sinon.spy();

      await userController.findUserByName(req, res, next);
      expect(res.statusCode).to.equal(200);
      expect(JSON.parse(res._getData())).to.deep.equal(user);
    });

    it('should return status 404 when no user is found', async () => {
      sinon.stub(userService, 'findUserByName').resolves(null);
      const req = httpMocks.createRequest({
        params: {
          name: 'NonExistingUser'
        }
      });
      const res = httpMocks.createResponse();
      const next = sinon.spy();

      await userController.findUserByName(req, res, next);
      expect(res.statusCode).to.equal(404);
      expect(JSON.parse(res._getData())).to.deep.equal({ message: "User not found" });
    });

    it('should handle errors and return status 500', async () => {
      sinon.stub(userService, 'findUserByName').rejects(new Error('Test error'));
      const req = httpMocks.createRequest({
        params: {
          name: 'Frodo'
        }
      });
      const res = httpMocks.createResponse();
      const next = sinon.spy();

      await userController.findUserByName(req, res, next);
      expect(next.calledOnce).to.be.true;
    });
  });
});



