import TestHelpers from '../test-helpers';
import models from '../../src/models';

describe('Role', ()=> {
    beforeAll(async () => {
        await TestHelpers.startDb();
    });

    afterAll(async () => {
        await TestHelpers.stopDb();
    });

    beforeEach(async () => {
        await TestHelpers.syncDb();
    });

    it('should delete the role records if the user is deleted', async () => {
        const { Role } = models;
        const rolesForNewUser = ['admin', 'customer'];
        const user = await TestHelpers.createNewUser({ roles: rolesForNewUser});
        let rolesCount = await Role.count();

        await user.destroy();
        rolesCount = await Role.count();
        expect(rolesCount).toEqual(0)
    });
});