const assert = require('assert');
const User = require('../src/user');

describe('Updating users in the database', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', likes: 0 });
        joe.save()
            .then(() => done());
    });

    // Helper function to assert Name
    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Finnigan');
                done();
            });
    }

    describe('using model instance', () => {
        it('updates a user by set n save', (done) => {
            joe.set('name', 'Finnigan');
            assertName(joe.save(), done);
        });

        it('updates a user by updateOne', (done) => {
            assertName(joe.updateOne({ name: 'Finnigan' }), done);
        });
    });

    describe('using class method', () => {
        it('updates users by updateMany', (done) => {
            assertName(
                User.updateMany({ name: 'Joe' }, { name: 'Finnigan' }),
                done
            );
        });

        it('updates a user by findOneAndUpdate', (done) => {
            assertName(
                User.findOneAndUpdate({ name: 'Joe' }, { name: 'Finnigan' }),
                done
            );
        });

        it('updates a user by findByIdAndUpdate', (done) => {
            assertName(
                User.findByIdAndUpdate(joe._id, { name: 'Finnigan' }),
                done
            );
        });

        it('increments the likes of a user by 1', (done) => {
            User.updateOne({ name: 'Joe' }, { $inc: { likes: 10 } })
                .then(() => User.findOne({ name: 'Joe' }))
                .then((user) => {
                    assert(user.likes === 10);
                    done();
                })
        });
    });
});
