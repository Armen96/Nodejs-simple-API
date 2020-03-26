const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    week: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    outcome: {
        type: Number,
        required: true
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('records', RecordSchema);
