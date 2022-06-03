const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Use ES6 Promises

before((done) => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection.once('open', () => {
        console.log('test db ready!');
        done();
    }).on('error', (error) => {
        console.warn('Oh no! ', error);
    });
});

beforeEach((done) => {
    mongoose.connection.collection('users').drop(() => {
        done();
    });
});
