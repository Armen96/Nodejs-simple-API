import { MONGO_URL } from '../../env';
const mongoose = require('mongoose');

const databaseConnection = async () => {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
};

export const connect = () => {
    databaseConnection().then();
};
