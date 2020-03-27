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

UsersSchema.index({'$**': 'text'});
export default mongoose.model('users', UsersSchema);
