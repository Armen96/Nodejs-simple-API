const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const UsersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users', UsersSchema);
