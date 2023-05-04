const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 4001;
const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

let interval;

let users = [];

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on('user login', (props) => {
        const { user } = props;
        if (!users.find(u => u.id === user.id)) {
            users.push(user);
        }
        nicknames = users.map(user => user.nickname);
        console.log(nicknames);
        io.emit("new login", {nicknames});
        clearInterval(interval);
    });

    socket.on("user logout", ({userId}) => {
        users = users.filter(user => user.id !== userId);
        nicknames = users.map(user => user.nickname);
        console.log(nicknames);
        io.emit("new login", {nicknames});
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));