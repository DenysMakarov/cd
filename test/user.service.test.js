require('dotenv').config({path: `.env.test`})
const sinon = require('sinon');

const userService = require('../src/services/user.service');
const { expect } = require('chai');
const {User} = require("../src/models");
const {expectedUsers} = require("./mock");
const {Sequelize} = require("sequelize");
// const {mock} = require("./mock");


describe('UserService', () => {
    let findAllStub, findOneStub;

    beforeEach(() => {
        findAllStub = sinon.stub(User, 'findAll').resolves(expectedUsers);
        findOneStub = sinon.stub(User, 'findOne').callsFake((options) => {
            // Extract the name using the Sequelize operator
            const searchName = options.where.name[Sequelize.Op.iLike].toLowerCase();

            // Find and return the matching user
            return Promise.resolve(expectedUsers.find(user => user.name.toLowerCase() === searchName));
        });
    });


    afterEach(() => {
        // Restore stubs to their original methods after each test
        sinon.restore();
    });

    describe('findAllUsers', () => {
        it('should return all users with their roles', async () => {
            const users = await userService.findAllUsers();
            expect(users).to.deep.equal(expectedUsers);
        });

        it('should verify the array length and content of returned users', async () => {
            const users = await userService.findAllUsers();
            expect(users).to.be.an('array').with.lengthOf(expectedUsers.length);
            expect(users[0].name).to.equal(expectedUsers[0].name);
            expect(findAllStub.calledOnce).to.be.true;
        });
    });

    describe('findUserByName', () => {
        it('should return a user that matches the provided name', async () => {
            const name = 'Frodo';
            const user = await userService.findUserByName(name);
            expect(user.name).to.equal(name);
        });



        it('should return null when no user matches the provided name', async () => {
            const name = 'NonExistingUser';
            findOneStub.resolves(null); // Adjust findOneStub to resolve null for this specific test
            const user = await userService.findUserByName(name);
            expect(user).to.be.null;
        });
    });
});


