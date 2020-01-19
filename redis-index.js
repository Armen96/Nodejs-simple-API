const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const fs = require('fs');
let creds = '';

const redis = require('redis');
let client = '';
const port = process.env.PORT || 4205;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));



// Store people in chatroom
let chatters = [];

// Store messages in chatroom
let chat_messages = [];

// Read credentials from JSON
fs.readFile('creds.json', 'utf-8', function(err, data) {
    if(err) throw err;
    creds = JSON.parse(data);
    client = redis.createClient('redis://' + creds.user + ':' + creds.password + '@' + creds.host + ':' + creds.port);

    // Redis Client Ready
    client.once('ready', function() {

        // Flush Redis DB
        // client.flushdb();

        // Initialize Chatters
        client.get('chat_users', function(err, reply) {
            if (reply) {
                chatters = JSON.parse(reply);
            }
        });

        // Initialize Messages
        client.get('chat_app_messages', function(err, reply) {
            if (reply) {
                chat_messages = JSON.parse(reply);
            }
        });
    });
});

// app.use(express.static(__dirname + 'view'));
app.set('views', __dirname + '/view');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.render('index.html');
});

// API - Join Chat
app.post('/join', function(req, res) {
    var username = req.body.username;
    if (chatters.indexOf(username) === -1) {
        chatters.push(username);
        client.set('chat_users', JSON.stringify(chatters));
        res.send({
            'chatters': chatters,
            'status': 'OK'
        });
    } else {
        res.send({
            'status': 'FAILED'
        });
    }
});

// API - Leave Chat
app.post('/leave', function(req, res) {
    var username = req.body.username;
    chatters.splice(chatters.indexOf(username), 1);
    client.set('chat_users', JSON.stringify(chatters));
    res.send({
        'status': 'OK'
    });
});

// API - Remove Chat
app.post('/remove', function(req, res) {
    chat_messages = [];
    client.set('chat_app_messages', JSON.stringify(chat_messages));
    res.send({
        'status': 'OK'
    });
});

// API - Send + Store Message
app.post('/send_message', function(req, res) {
    var username = req.body.username;
    var message = req.body.message;
    chat_messages.push({
        'sender': username,
        'message': message
    });
    client.set('chat_app_messages', JSON.stringify(chat_messages));
    res.send({
        'status': 'OK'
    });
});

// API - Get Messages
app.get('/get_messages', function(req, res) {
    res.send(chat_messages);
});

// API - Get Chatters
app.get('/get_chatters', (req, res) => {
    res.send(chatters);
});


// Socket Connection
// UI Stuff
io.on('connection', function(socket) {

    // Fire 'send' event for updating Message list in UI
    socket.on('message', function(data) {
        io.emit('send', data);
    });

    // Fire 'count_chatters' for updating Chatter Count in UI
    socket.on('update_chatter_count', function(data) {
        io.emit('count_chatters', data);
    });

    socket.on('remove', function () {
        io.emit('message_removed');
    })
});



http.listen(port, () => {
    console.log('Server started...');
});

