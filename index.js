const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const http = require('http').Server(app);
const middlewarePassport = require('./app/middlewares/passport');

const usersRoutes = require('./routes/UsersRoutes');
const recordsRoutes = require('./routes/RecordsRoutes');
const port = process.env.PORT || 4205;

// MongoDB
import { databaseConnection } from './database/index';
databaseConnection().then(() => {
    app.use(passport.initialize());
    middlewarePassport(passport);
    console.log('DB Connected ... ');
});


app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', usersRoutes);
app.use('/api/records', recordsRoutes);

http.listen(port, () => {
    console.log('Server started...');
});

