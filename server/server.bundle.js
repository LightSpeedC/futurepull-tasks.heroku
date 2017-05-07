/* Banner */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./src/lib/generate-uuid.ts ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let lastTime = 0;
let lastNum = 0;
const Z7 = parseInt('zzzzzzz', 36);
function generateUUID() {
    let time = Date.now();
    let num = lastNum;
    if (time > lastTime)
        num = random7();
    else
        time = lastTime;
    ++num;
    if (num >= Z7)
        time++, num = 0;
    lastTime = time;
    lastNum = num;
    return time9(time) + num7(num);
}
exports.generateUUID = generateUUID;
function generateUUIDs(n) {
    if (n <= 0)
        throw new Error('number must be positive!');
    let time = Date.now();
    let num = lastNum;
    if (time > lastTime)
        num = random7();
    else
        time = lastTime;
    const result = new Array(n);
    let t9 = time9(time);
    for (let i = 0; i < n; ++i) {
        ++num;
        if (num >= Z7) {
            ++time, num = 0;
            t9 = time9(time);
        }
        result[i] = t9 + num7(num);
    }
    lastTime = time;
    lastNum = num;
    return result;
}
exports.generateUUIDs = generateUUIDs;
function zpad(s, m) {
    return ('00000000' + s).substr(-m);
}
function zpad36(n, m) {
    return zpad(n.toString(36), m);
}
function time9(time) {
    return zpad36(time, 9);
}
function num7(num) {
    return zpad36(num, 7);
}
function random7() {
    return Math.floor(Math.random() * Z7);
}
// generateUUID['generateUUID'] = generateUUID;
// generateUUID['generateUUIDs'] = generateUUIDs;
exports.default = generateUUID;


/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./src/api/index.ts ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(/*! ./api */ 10);


/***/ }),
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./src/lib/event-emitter.ts ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// EventEmitter
const EventEmitter = (function () {
    // EventEmitter
    class EventEmitter {
        constructor() {
            this.listeners = Object.create(null);
            this.listeners1 = Object.create(null);
        }
        // constructor() {
        // 	// this.reset();
        // }
        // reset
        reset() {
            this.listeners = Object.create(null);
            this.listeners1 = Object.create(null);
            return this;
        }
        // on
        on(event, listener) {
            if (!this.listeners)
                this.listeners = Object.create(null);
            return add(this.listeners, event, listener), this;
        }
        // one
        one(event, listener) {
            if (!this.listeners1)
                this.listeners1 = Object.create(null);
            return add(this.listeners1, event, listener), this;
        }
        // off
        off(event, listener) {
            if (!event)
                return this.reset();
            remove(this.listeners, event, listener);
            remove(this.listeners1, event, listener);
            return this;
        }
        // fire
        fire(event, ...args) {
            fire(this.listeners, event, args);
            fire(this.listeners1, event, args);
            if (this.listeners1 && this.listeners1[event])
                delete this.listeners1[event];
            return this;
        }
        // mixin
        static mixin(Class) {
            Object.getOwnPropertyNames(EventEmitter.prototype).forEach(x => {
                if (Class.prototype[x])
                    return;
                Object.defineProperty(Class.prototype, x, {
                    value: EventEmitter.prototype[x],
                    writable: true, enumerable: false, configurable: true,
                });
            });
        }
    }
    // add
    function add(listeners /*Function[]*/, event, listener) {
        (listeners[event] || (listeners[event] = [])).push(listener);
    }
    // remove
    function remove(listeners /*Function[]*/, event, listener) {
        if (!listeners || !event || !listeners[event])
            return;
        if (!listener)
            return delete listeners[event];
        listeners[event] = listeners[event].filter((fn) => fn !== listener);
        if (listeners[event].length === 0)
            delete listeners[event];
    }
    // fire
    function fire(listeners /*Function[]*/, event, args) {
        if (listeners && listeners[event])
            listeners[event].forEach((listener) => listener.apply(null, args));
    }
    alias(EventEmitter, 'clear', 'reset');
    alias(EventEmitter, 'once', 'one');
    alias(EventEmitter, 'addEventListener', 'on');
    alias(EventEmitter, 'removeEventListener', 'off');
    alias(EventEmitter, 'emit', 'fire');
    alias(EventEmitter, 'subscribe', 'on');
    alias(EventEmitter, 'unsubscribe', 'off');
    alias(EventEmitter, 'publish', 'fire');
    alias(EventEmitter, 'trigger', 'fire');
    // alias
    function alias(Class, x, y) {
        Object.defineProperty(Class.prototype, x, {
            value: Class.prototype[y],
            writable: true, enumerable: false, configurable: true,
        });
        // Class.prototype[x] = Class.prototype[y];
    }
    // EventEmitter.prototype.clear = EventEmitter.prototype.reset;
    // EventEmitter.prototype.once = EventEmitter.prototype.one;
    // EventEmitter.prototype.addEventListener = EventEmitter.prototype.on;
    // EventEmitter.prototype.removeEventListener = EventEmitter.prototype.off;
    // EventEmitter.prototype.emit = EventEmitter.prototype.fire;
    // EventEmitter.prototype.subscribe = EventEmitter.prototype.on;
    // EventEmitter.prototype.unsubscribe = EventEmitter.prototype.off;
    // EventEmitter.prototype.publish = EventEmitter.prototype.fire;
    // EventEmitter.prototype.trigger = EventEmitter.prototype.fire;
    return EventEmitter;
})();
module.exports = EventEmitter;
// console.log(Object.keys(EventEmitter.prototype));
// console.log(Object.getOwnPropertyNames(EventEmitter.prototype));
// Object.getOwnPropertyNames(EventEmitter.prototype).forEach(x => {
//	console.log(x, Object.getOwnPropertyDescriptor(EventEmitter.prototype, x));
// });
/*
class MyClass extends EventEmitter {};
// class MyClass {};
EventEmitter.mixin(MyClass);

// var ee = new EventEmitter();
var ee = new MyClass();
ee.on('eventx', (arg1, arg2) => console.log('eventx', arg1, arg2));
ee.fire('eventx', 11, 12);
ee.fire('eventx', 21, 22);
ee.one('event1', (arg1, arg2) => console.log('event1', arg1, arg2));
ee.fire('event1', 11, 12);
ee.fire('event1', 21, 22);
ee.off('eventx');
ee.fire('eventx', 31, 32);
*/


/***/ }),
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./src/lib/socket-rpc.ts ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// SocketRPC
// request(method, params, callback)
//	callback(error, result)
// emit(event, message)
// on(event, listener)
// once(event, listener)
// off(event)

const generateUUID = __webpack_require__(/*! ./generate-uuid */ 1);
const REQ = '-req';
const RES = '-res-';
const TIMEOUT = 5000;
// const EventEmitter = require('./event-emitter');
class SocketRPC {
    constructor(socket, methodCallbacks) {
        this.socket = socket;
        // this.ee = new EventEmitter;
        if (methodCallbacks)
            Object.keys(methodCallbacks).forEach(method => this.onRequest(method, methodCallbacks[method]));
    }
    request(method, params, options) {
        return new Promise((resolve, reject) => {
            const id = generateUUID();
            this.emit(method + REQ, { id, method, params });
            let timer = setTimeout(() => {
                // if (timer) reject(new Error('TIMEOUT'));
                if (timer)
                    resolve({ error: { code: 'TIMEOUT', message: 'timeout' } });
                timer = null;
            }, (options && options.TIMEOUT) || TIMEOUT);
            this.onResponse(method, id, message => {
                if (timer)
                    clearTimeout(timer);
                timer = null;
                resolve(message);
            });
        });
    }
    response(method, id, message) {
        return this.emit(method + RES + id, message);
    }
    onRequest(method, callback) {
        return this.on(method + REQ, callback.bind(this));
    }
    onResponse(method, id, callback) {
        return this.once(method + RES + id, callback.bind(this));
    }
    emit(event, message) {
        this.socket.emit(event, message);
        return this;
    }
    on(event, listener) {
        this.socket.on(event, listener);
        return this;
    }
    once(event, listener) {
        this.socket.once(event, listener);
        return this;
    }
    off(event) {
        this.socket.off(event);
        return this;
    }
}
module.exports = SocketRPC;


/***/ }),
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** external "serve-index" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("serve-index");

/***/ }),
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 9 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./src/api/api-books.ts ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (context) {
    const router = __webpack_require__(/*! express */ 0).Router();
    const list = [];
    const books = context.books = { list, nextId: 0 };
    const reduceMaxId = (a, b) => Math.max(a, b.id);
    for (let id = 0; id < 1e3; ++id)
        books.list.push({ id, name: 'books' + id });
    books.nextId = books.list.reduce(reduceMaxId, 0) + 1;
    const SIZE = 10;
    const NOT_FOUND = {
        code: 'NOT_FOUND',
        message: 'not found'
    };
    // GET /?offset=0&size=10
    router.get('/', (req, res) => {
        const offset = Number(req.query.offset || 0);
        const size = Number(req.query.size || SIZE);
        res.json({ result: { list: books.list.slice(offset, offset + size), offset, size, length: books.list.length } });
    });
    // GET /:id
    router.get('/:id', (req, res) => {
        const pos = getIndex(Number(req.params.id));
        if (pos < 0)
            return res.json({ error: NOT_FOUND });
        res.json({ result: books.list[pos] });
    });
    // POST /
    router.post('/', (req, res) => {
        const elem = req.body;
        elem.id = books.nextId++;
        books.list.push(elem);
        res.json({ result: elem });
    });
    // PUT /:id
    router.put('/:id', (req, res) => {
        const pos = getIndex(req.params.id);
        if (pos < 0)
            return res.json({ error: NOT_FOUND });
        res.json({ result: books.list.splice(pos, 1, req.body) });
    });
    // DELETE /:id
    router.delete('/:id', (req, res) => {
        const pos = getIndex(req.params.id);
        if (pos < 0)
            return res.json({ error: NOT_FOUND });
        res.json({ result: books.list.splice(pos, 1) });
    });
    // getIndex
    function getIndex(id) {
        id = Number(id);
        const len = books.list.length;
        for (let pos = 0; pos < len; ++pos)
            if (books.list[pos].id === id)
                return pos;
        return -1;
    }
    return router;
};


/***/ }),
/* 10 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** ./src/api/api.ts ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (context) {
    const router = __webpack_require__(/*! express */ 0).Router();
    router.use('/books', __webpack_require__(/*! ./api-books */ 9)(context));
    return router;
};


/***/ }),
/* 11 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const gg = __webpack_require__(/*! ./lib/generate-uuid */ 1);
const ee = __webpack_require__(/*! ./lib/event-emitter */ 3);
const ss = __webpack_require__(/*! ./lib/socket-rpc */ 4);
const PORT = process.env.PORT || 3000;
const express = __webpack_require__(/*! express */ 0);
const app = express();
const serveIndex = __webpack_require__(/*! serve-index */ 7);
const bodyParser = __webpack_require__(/*! body-parser */ 5);
const http = __webpack_require__(/*! http */ 6);
const api = __webpack_require__(/*! ./api */ 2);
const server = http.Server(app);
const io = __webpack_require__(/*! socket.io */ 8)(server);
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


/***/ })
/******/ ]);