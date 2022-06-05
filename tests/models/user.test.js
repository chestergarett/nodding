import TestHelpers from '../test-helpers';
import models from '../../src/models';

describe('User', ()=>{
    beforeAll(async()=>{
        await TestHelpers.startDb();
    });

    afterAll(async()=>{
        await TestHelpers.stopDb();
    });

    beforeEach(async() => {
        await TestHelpers.syncDb();
    });

    describe('static methods', ()=>{
        describe('hashPassword', ()=>{
            it('should has the password passed in the arguments', async()=>{
                const { User } = models;
                const password = 'Test123#';
                const hashedPassword = await User.hashPassword(password);
                expect(password).not.toEqual(hashedPassword);
            })
        });

        describe('createNewUser', ()=>{
            it('should create a new user successfully', async ()=>{
                const { User } = models;
                const data = { 
                    email: 'test@example.com',
                    password: 'Test123#',
                    roles: ['admin', 'customer'],
                    username: 'test',
                    firstName: 'David',
                    lastName: 'Armendariz',
                    refreshToken: 'test-refresh-token',
                }

                const newUser = await User.createNewUser(data);
                const usersCount = await User.count();
                expect(usersCount).toEqual(1);
                expect(newUser.email).toEqual(data.email);
                expect(newUser.password).toBeUndefined();
                expect(newUser.username).toEqual(data.username);
                expect(newUser.lastName).toEqual(data.lastName);
                expect(newUser.RefreshToken.token).toEqual(data.refreshToken);
                expect(newUser.Roles.length).toEqual(2);
                
                const savedRoles = newUser.Roles.map(savedRole => savedRole.role).sort();
                expect(savedRoles).toEqual(data.roles.sort());
            })

            it('should error if we create a new user with an invalid email', async()=>{
                const { User } = models;
                const data = { 
                    email: 'test',
                    password: 'Test123#',
                };

                let error;

                try {
                    await User.createNewUser(data);
                } catch (err) {
                    error = err;
                }

                expect(error).toBeDefined();
                expect(error.errors.length).toEqual(1);
                
                const errorObj = error.errors[0]
                expect(errorObj.message).toEqual('Not a valid email address');
                expect(errorObj.path).toEqual('email');
            });

            it('should error if we do not pass an email', async()=> {
                const { User } = models;
                const data = {
                    password: 'Test123#',
                }
                let error;
                try {
                    await User.createNewUser(data);
                } catch (err) {
                    error = err;
                }

                expect(error).toBeDefined();
                expect(error.errors.length).toEqual(1);

                const errorObj = error.errors[0]
                expect(errorObj.message).toEqual('Email is required');
                expect(errorObj.path).toEqual('email');
            })
        });
    })
});