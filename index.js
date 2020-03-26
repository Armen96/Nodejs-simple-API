const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const http = require('http').Server(app);
const middlewarePassport = require('./src/app/middlewares/passport');
import router from './src/routes';


const PORT = process.env.PORT || 4205;

// MongoDB
import { connect } from './src/app/database';
connect();

app.use(express.static('public'));
app.use(passport.initialize());
middlewarePassport(passport);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

http.listen(PORT);

