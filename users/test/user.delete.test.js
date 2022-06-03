const assert = require('assert');
const User = require('../src/user');

describe('Deleting users from the database', () => {
    let joe;

    // [done] tells Mocha that the async test is finished running
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => done());
    });

    describe('using model instance', () => {
        it('removes a user', (done) => {
            joe.remove()
                .then(() => User.findOne({ name: 'Joe' }))
                .then((user) => {
                    assert(user === null);
                    done();
                });
        });
    });

    describe('using class method', () => {
        it('removes a user by deleteMany', (done) => {
            User.deleteMany({ name: 'Joe' })
                .then(() => User.findOne({ name: 'Joe' }))
                .then((user) => {
                    assert(user === null);
                    done();
                });
        });

        it('removes a user by findOneAndRemove', (done) => {
            User.findOneAndRemove({ name: 'Joe' })
                .then(() => User.findOne({ name: 'Joe' }))
                .then((user) => {
                    assert(user === null);
                    done();
                });
        });

        it('removes a user by findByIdAndRemove', (done) => {
            User.findByIdAndRemove(joe._id)
                .then(() => User.findOne({ name: 'Joe' }))
                .then((user) => {
                    assert(user === null);
                    done();
                });
        })
    });
});
