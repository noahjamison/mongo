const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    describe('postCount', () => {
        it('returns the number of posts', (done) => {
            const joe = new User({
                name: 'Joe',
                posts: [{ title: 'A Catchy Title' }],
            });

            joe.save()
                .then(() => User.findOne({ name: 'Joe' }))
                .then((user) => {
                    assert(user.postCount === 1);
                    done();
                });
        });
    });
});
