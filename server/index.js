const express = require('express');
// const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 8900;

const app = express();
const server = http.createServer(app);
// const io = socketio(server);

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));

const router = require('./router');
app.use(router);

const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

io.on('connection', (socket) => {
	//  establish connection
	// take userUID and socketId from user
	console.log('new user connected');

	socket.on('addUser', (user) => {
		if (user !== null) {
			console.log(`${user.uid} connected`);
			addUser(user.id, socket.id);
			console.log('USERS: ', users);
			io.emit('getUsers', users);
		}
	});

	//  send and get message
	socket.on('sendMessage', ({ senderId, receiverId, text }) => {
		let receiver;
		users.forEach((user) => {
			console.log(user.userId, receiverId);
			if (String(user.userId) === String(receiverId)) receiver = user;
		});
		if (receiver) {
			console.log('SENT, GET MESSAGE: ', text, senderId, receiver.socketId);
			io.to(receiver.socketId).emit('getMessage', {
				senderId,
				text,
			});
		} else {
			console.log('REFRESH CHANNEL', senderId);
			users.forEach((user) => {
				if (String(senderId.id) !== String(user.userId)) {
					io.to(user.socketId).emit('getMessage', {
						senderId,
						text,
					});
				}
			});
		}
	});

	// add member to a channel and get updated details
	socket.on('addMember', ({ addedBy, member }) => {
		users.forEach((user) => {
			if (String(addedBy.id) !== String(user.userId)) {
				io.to(user.socketId).emit('checkChannel', {
					member,
				});
			}
		});
	});

	//  disconnect user
	socket.on('disconnect', () => {
		console.log('a user disconnnected');
		removeUser(socket.id);
		io.emit('getUsers', users);
	});
});
