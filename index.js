const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
const http = require('http').Server(app);
const middlewarePassport = require('./src/app/middlewares/passport');
import router from './src/routes';
const socketIO = require('socket.io');

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

const io = socketIO(http);
io.on('connection', (socket) => {
    socket.on('messages', () => {
        io.emit('messages', [{created_at: "26/04/2020", message: "Chis", user_id: "aasdasdasd"}]);
    });

    socket.on('joinToRoom', (roomId) => {
        socket.join(roomId);
    });

    socket.on('leaveTheRoom', (roomId) => {
        socket.leave(roomId);
    });

    socket.on('new-message', (roomId, msg) => {
        io.in(roomId).emit('new-message', msg);
    });
});

app.use('/api', router);

http.listen(PORT);

