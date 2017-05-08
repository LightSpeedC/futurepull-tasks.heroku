'use strict';

const gg = require('./lib/generate-uuid');
const ee = require('./lib/event-emitter');
const ss = require('./lib/socket-rpc');

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const serveIndex = require('serve-index');

const bodyParser = require('body-parser');
const http = require('http');

const api = require('./api');

const server = http.Server(app);
const io = require('socket.io')(server);
const context = { io, tasks: [] };
const CHAT_MESSAGE = 'chat-message';
const SEND_ALL_TASKS = 'send-all-tasks';
const ALL_TASKS = 'all-tasks';

io.on('connection', function (socket) {
	console.log('a user connected');

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});

	socket.on(CHAT_MESSAGE, function (msg) {
		console.log('message: ' + msg);
		io.emit(CHAT_MESSAGE, msg);
	});

	socket.on(SEND_ALL_TASKS, function () {
		console.log('send-all-tasks:');
		socket.emit(ALL_TASKS, context.tasks);
	});

});

app.set('json spaces', '  '); // JSON形式を指定: res.json({})
app.use(bodyParser.json());
app.use('/headers', (req, res, next) => res.json({ headers: req.headers }));
app.use('/api', api(context));

app.use(express.static('public'));
app.use(serveIndex('public', { icons: true }));

server.listen(PORT, () => console.log('listening port:', PORT));
