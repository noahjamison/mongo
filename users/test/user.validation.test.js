const assert = require('assert');
const User = require('../src/user');

describe('Validating users', () => {
    it('requires a user name', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Nobody wants to be nameless, aimless');
    });

    it('requires a user name longer than 2 characters', () => {
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters.');
    });

    it('stops invalid users from being saved', (done) => {
        const user = new User({ name: 'Al' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;

                assert(message === 'Name must be longer than 2 characters.');
            });

        done();
    });
});
