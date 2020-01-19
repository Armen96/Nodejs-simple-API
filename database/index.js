import { MONGO_URL } from '../env';
const mongoose = require('mongoose');

export const databaseConnection = async () => {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};
