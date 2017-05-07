'use strict';

let lastTime = 0;
let lastNum = 0;
const Z7 = parseInt('zzzzzzz', 36);

function generateUUID(): string {
	let time = Date.now();
	let num = lastNum;
	if (time > lastTime) num = random7();
	else time = lastTime;

	++num;
	if (num >= Z7) time++ , num = 0;

	lastTime = time;
	lastNum = num;
	return time9(time) + num7(num);
}

function generateUUIDs(n: number): string[] {
	if (n <= 0) throw new Error('number must be positive!');

	let time = Date.now();
	let num = lastNum;
	if (time > lastTime) num = random7();
	else time = lastTime;

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

function zpad(s: string, m: number): string {
	return ('00000000' + s).substr(-m);
}

function zpad36(n: number, m: number): string {
	return zpad(n.toString(36), m);
}

function time9(time: number): string {
	return zpad36(time, 9);
}

function num7(num: number): string {
	return zpad36(num, 7);
}

function random7(): number {
	return Math.floor(Math.random() * Z7);
}

// generateUUID['generateUUID'] = generateUUID;
// generateUUID['generateUUIDs'] = generateUUIDs;
export default generateUUID;
export { generateUUID, generateUUIDs };
//module.exports = generateUUID;
