import * as React from 'react';
import * as ReactDOM from 'react-dom';

const socket = io();
const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));
// const CHAT_MESSAGE = 'chat-message';
const SEND_ALL_TASKS = 'send-all-tasks';
const ALL_TASKS = 'all-tasks';

interface Form1Props { };

interface Form1State {
	value: string;
	tasks: Task[];
};

class Task {
	id: string;
	done: boolean;
	title: string;

	constructor(task: { id: string, done: boolean, title: string }) {
		this.id = task.id;
		this.done = task.done;
		this.title = task.title;
	}
}

class Form1 extends React.Component<Form1Props, Form1State> {
	state: Form1State;

	constructor(props: Form1Props, context: any) {
		super(props, context);
		this.state = { value: '', tasks: [] };
		this.onSendMessage = this.onSendMessage.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
		this.onKeyPressInput = this.onKeyPressInput.bind(this);
	}

	componentDidMount() {
		socket.on(ALL_TASKS, (tasks: any[]) => {
			this.setState(s => (s.tasks = tasks.map(x => new Task(x)), s));
		});
		socket.emit(SEND_ALL_TASKS);
	}

	componentWillUnmount() {
		socket.off(ALL_TASKS);
	}

	onSendMessage() {
		// socket.emit(CHAT_MESSAGE, this.state.value);
		this.setState(s => (s.value = '', s));
		return false;
	}

	onChangeInput(ev: any) {
		const value = ev.target.value;
		this.setState(s => (s.value = value, s));
	}

	onKeyPressInput(ev: any) {
		const code = ev.keyCode || ev.charCode || ev.which;
		if (code === 13) this.onSendMessage();
	}

	render() {
		return <div>
			<ul className="messages-class">
				{this.state.tasks.map(x => <li key={x.id}>{x}</li>)}
			</ul>
			<div className="form-class">
				<input type="text" autoComplete="off" autoFocus
					value={this.state.value}
					onChange={this.onChangeInput}
					onKeyPress={this.onKeyPressInput} />
				<button onClick={this.onSendMessage}>Send</button>
			</div>
		</div>;
	}
}

const content = document.getElementById('content');
if (content) ReactDOM.render(<Form1 />, content);
