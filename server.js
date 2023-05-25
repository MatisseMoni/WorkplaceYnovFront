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

    socket.on('user login', (props) => {
        const { user } = props;
        if (!users.find(u => u.id === user.id)) {
            users.push(user);
        }
        userInfos = users.map(user => ({nickname: user.nickname, id: user.id}));
        io.emit("new login", userInfos);
        clearInterval(interval);
    });

    socket.on("user logout", ({userId}) => {
        users = users.filter(user => user.id !== userId);
        userInfos = users.map(user => ({nickname: user.nickname, id: user.id}));
        io.emit("new login", userInfos);
        clearInterval(interval);
    });

    socket.on("send message", (data) => {
        io.emit("new message", data);
        clearInterval(interval);
    })

    socket.on("send thread", (data) => {
        io.emit("new thread", data);
        clearInterval(interval);
    })

    socket.on("send group", (group) => {
        io.emit("new group", group);
        clearInterval(interval);
    });

    socket.on("remove group", (idGroupe) => {
        console.log("remove group", idGroupe);
        io.emit("delete group", idGroupe);
        clearInterval(interval);
    });

    

});

server.listen(port, () => console.log(`Listening on port ${port}`));