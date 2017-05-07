// EventEmitter

const EventEmitter = (function () {

	// EventEmitter
	class EventEmitter {
		listeners: any = Object.create(null);
		listeners1: any = Object.create(null);

		// constructor() {
		// 	// this.reset();
		// }

		// reset
		reset(): EventEmitter {
			this.listeners = Object.create(null);
			this.listeners1 = Object.create(null);
			return this;
		}

		// on
		on(event: string, listener: Function): EventEmitter {
			if (!this.listeners) this.listeners = Object.create(null);
			return add(this.listeners, event, listener), this;
		}

		// one
		one(event: string, listener: Function): EventEmitter {
			if (!this.listeners1) this.listeners1 = Object.create(null);
			return add(this.listeners1, event, listener), this;
		}

		// off
		off(event?: string, listener?: Function): EventEmitter {
			if (!event) return this.reset();
			remove(this.listeners, event, listener);
			remove(this.listeners1, event, listener);
			return this;
		}

		// fire
		fire(event: string, ...args: any[]): EventEmitter {
			fire(this.listeners, event, args);
			fire(this.listeners1, event, args);
			if (this.listeners1 && this.listeners1[event])
				delete this.listeners1[event];
			return this;
		}

		// mixin
		static mixin(Class: Function) {
			Object.getOwnPropertyNames(EventEmitter.prototype).forEach(x => {
				if (Class.prototype[x]) return;
				Object.defineProperty(Class.prototype, x, {
					value: EventEmitter.prototype[x],
					writable: true, enumerable: false, configurable: true,
				});
			});
		}
	}

	// add
	function add(listeners: any/*Function[]*/, event: string, listener: Function) {
		(listeners[event] || (listeners[event] = [])).push(listener);
	}

	// remove
	function remove(listeners?: any/*Function[]*/, event?: string, listener?: Function) {
		if (!listeners || !event || !listeners[event]) return;
		if (!listener) return delete listeners[event];

		listeners[event] = listeners[event].filter((fn: Function) => fn !== listener);
		if (listeners[event].length === 0) delete listeners[event]
	}

	// fire
	function fire(listeners: any/*Function[]*/, event: string, args: any[]) {
		if (listeners && listeners[event])
			listeners[event].forEach((listener: Function) => listener.apply(null, args));
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
	function alias(Class: Function, x: string, y: string) {
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

export = EventEmitter;

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
