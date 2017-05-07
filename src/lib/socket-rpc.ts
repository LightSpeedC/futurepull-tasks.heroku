// SocketRPC

// request(method, params, callback)
//	callback(error, result)

// emit(event, message)
// on(event, listener)
// once(event, listener)
// off(event)

'use strict';

const generateUUID = require('./generate-uuid');
const REQ = '-req';
const RES = '-res-';
const TIMEOUT = 5000;

// const EventEmitter = require('./event-emitter');

class SocketRPC {
	socket;

	constructor(socket, methodCallbacks) {
		this.socket = socket;
		// this.ee = new EventEmitter;
		if (methodCallbacks)
			Object.keys(methodCallbacks).forEach(method =>
				this.onRequest(method, methodCallbacks[method]));
	}

	request(method: string, params, options?) {
		return new Promise((resolve, reject) => {
			const id = generateUUID();
			this.emit(method + REQ, { id, method, params });

			let timer: any = setTimeout(() => {
				// if (timer) reject(new Error('TIMEOUT'));
				if (timer) resolve({ error: { code: 'TIMEOUT', message: 'timeout' } });
				timer = null;
			}, (options && options.TIMEOUT) || TIMEOUT);

			this.onResponse(method, id, message => {
				if (timer) clearTimeout(timer);
				timer = null;
				resolve(message);
			});
		});
	}

	response(method: string, id: string, message: any) {
		return this.emit(method + RES + id, message);
	}

	onRequest(method: string, callback: Function) {
		return this.on(method + REQ, callback.bind(this));
	}

	onResponse(method: string, id: string, callback: Function) {
		return this.once(method + RES + id, callback.bind(this));
	}

	emit(event: string, message: any) {
		this.socket.emit(event, message);
		return this;
	}

	on(event: string, listener: Function) {
		this.socket.on(event, listener);
		return this;
	}

	once(event: string, listener: Function) {
		this.socket.once(event, listener);
		return this;
	}

	off(event: string) {
		this.socket.off(event);
		return this;
	}
}

module.exports = SocketRPC;
