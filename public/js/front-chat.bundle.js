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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./src/front-chat.tsx ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ 0);
const ReactDOM = __webpack_require__(/*! react-dom */ 1);
const socket = io();
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
const CHAT_MESSAGE = 'chat-message';
;
;
class Form1 extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { value: '', messages: [] };
        this.onSendMessage = this.onSendMessage.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onKeyPressInput = this.onKeyPressInput.bind(this);
    }
    componentDidMount() {
        socket.on(CHAT_MESSAGE, (msg) => {
            const messages = this.state.messages;
            messages.push(msg);
            if (messages.length > 10)
                messages.shift();
            this.setState(s => (s.messages = messages, s));
        });
    }
    componentWillUnmount() {
        socket.off(CHAT_MESSAGE);
    }
    onSendMessage() {
        socket.emit(CHAT_MESSAGE, this.state.value);
        this.setState(s => (s.value = '', s));
        return false;
    }
    onChangeInput(ev) {
        const value = ev.target.value;
        this.setState(s => (s.value = value, s));
    }
    onKeyPressInput(ev) {
        const code = ev.keyCode || ev.charCode || ev.which;
        if (code === 13)
            this.onSendMessage();
    }
    render() {
        return React.createElement("div", null,
            React.createElement("ul", { className: "messages-class" }, this.state.messages.map(x => React.createElement("li", { key: x },
                " ",
                x,
                " "))),
            React.createElement("div", { className: "form-class" },
                React.createElement("input", { type: "text", autoComplete: "off", autoFocus: true, value: this.state.value, onChange: this.onChangeInput, onKeyPress: this.onKeyPressInput }),
                React.createElement("button", { onClick: this.onSendMessage }, "Send")));
    }
}
const content = document.getElementById('content');
if (content)
    ReactDOM.render(React.createElement(Form1, null), content);


/***/ })
/******/ ]);
//# sourceMappingURL=front-chat.bundle.js.map