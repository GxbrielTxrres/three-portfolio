import EventEmitter from "./EventEmitter.js";

export default class Time extends EventEmitter {
	constructor() {
		super();

		//SETUP
		this.start = Date.now();
		this.current = this.start;
		this.elapsed = 0;
		this.delta = 16;

		window.requestAnimationFrame(() => {
			this.tick();
		});
	}

	tick() {
		const currentTime = Date.now();
		this.delta = currentTime - this.current;
		this.elapsedTime = this.current - this.start;
		this.current = currentTime;

		this.trigger("tick");

		window.requestAnimationFrame(() => {
			this.tick();
		});
	}
}
