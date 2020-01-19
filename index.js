const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const usersRoutes = require('./routes/usersRoutes');

// MongoDB
const databaseConnection = require('./database/index');
databaseConnection();


const port = process.env.PORT || 4205;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/api/users', usersRoutes);

http.listen(port, () => {
    console.log('Server started...');
});

