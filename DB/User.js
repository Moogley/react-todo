const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const user = new Schema ({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
});

const User = mongoose.model('user', user);

module.exports = User