const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

export const UsersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: {
        type: String,
        required: true
    },
    image: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: Object,
        default: []
    }
});

UsersSchema.index({'$**': 'text'});
export default mongoose.model('users', UsersSchema);
