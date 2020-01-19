const databaseConnection = async () => {
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/messanger_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.connection.once('open', () => {
        console.log('Connection opened!!!')
    });
};

module.exports = databaseConnection;


