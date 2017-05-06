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
const context = { io, socket: null };
const CHAT_MESSAGE = 'chat-message';

io.on('connection', function (socket) {
	console.log('a user connected');
	context.socket = socket;

	socket.on('disconnect', function () {
		console.log('user disconnected');
		context.socket = null;
	});

	socket.on(CHAT_MESSAGE, function (msg) {
		console.log('message: ' + msg);
		io.emit(CHAT_MESSAGE, msg);
	});

});

app.set('json spaces', '  '); // JSON形式を指定→res.json({})
app.use(bodyParser.json());
app.use('/headers', (req, res, next) => res.json({ headers: req.headers }));
app.use('/api', api(context));

app.use(express.static('public'));
app.use(serveIndex('public', { icons: true }));

server.listen(PORT, () => console.log('listening port: ', PORT));