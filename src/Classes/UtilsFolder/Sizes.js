import EventEmitter from "./EventEmitter.js";

export default class Sizes extends EventEmitter {
	constructor() {
		super();

		//SETUP
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.ratio = Math.min(window.devicePixelRatio, 2);

		//RESIZE
		window.addEventListener("resize", () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.ratio = Math.min(window.devicePixelRatio, 2);

			//TRIGGER
			this.trigger("resize");
		});
	}
}
