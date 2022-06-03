const assert = require('assert');
const User = require('../src/user');

describe('Creating users into the database', () => {
    it('saves a user', (done) => {
        const joe = new User({ name: 'Joe' });

        joe.save().then(() => {
            assert(!joe.isNew);
            done();
        });
    });
});
