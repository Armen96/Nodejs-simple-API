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
import { connect, messengerSchema } from './src/app/database';
connect();

app.use(express.static('public'));
app.use(passport.initialize());
middlewarePassport(passport);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const io = socketIO(http);
io.on('connection', (socket) => {
    socket.on('messages', async (roomId) => {
        const response = await messengerSchema.getByFieldName('short_id', roomId);
        io.emit('messages', response);
    });

    socket.on('joinToRoom', (roomId) => {
        socket.join(roomId);
    });

    socket.on('leaveTheRoom', (roomId) => {
        socket.leave(roomId);
    });

    socket.on('new-message', (roomId, data) => {
        messengerSchema._create(data.message, data.to_id, data.from_id, data.short_id, data.status, data.created_at);
        io.in(roomId).emit('new-message', data);
    });
});

app.use('/api', router);

http.listen(PORT);

