const assert = require('assert');
const User = require('../src/user');

describe('Posts', () => {
    it('can create a post', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'Test Post' }],
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'Test Post');
                done();
            });
    });

    it('can add a post to an existing user', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [],
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts.push({ title: 'Post 1.0' });
                return user.save();
            })
            .then((user) => {
                assert(user.posts[0].title === 'Post 1.0');
                done();
            });
    });

    it('can remove an existing post', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'Existing Post' }],
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
});
