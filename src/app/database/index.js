import { MONGO_URL } from '../../env';
const mongoose = require('mongoose');

import AppDAO from './sqlite3/main';
import MessengerRepository from './sqlite3/message_repository';
const dao = new AppDAO('./database.sqlite3');
export const messengerSchema = new MessengerRepository(dao);
messengerSchema._createTable().catch((err) => {console.log('Error: ', err)});

const databaseConnectionMongoStart = async () => {
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
};

export const connect = () => {
    databaseConnectionMongoStart().then();
};
