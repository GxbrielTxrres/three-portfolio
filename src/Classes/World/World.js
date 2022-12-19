import SceneDetails from "../SceneDetails";
import Environment from "./Environment";
import Floor from "./Floor.Js";
import Corvette from "./Corvette";

export default class World {
	constructor() {
		this.details = new SceneDetails();
		this.scene = this.details.scene;
		this.resources = this.details.resources;
		this.time = this.details.time;

		//WAIT FOR RECOURSES
		this.resources.on("ready", () => {
			//Setup
			this.floor = new Floor();
			this.corvette = new Corvette();
			this.environment = new Environment();
		});
	}

	update() {
		if (this.corvette && this.time.elapsedTime > 8000) {
			this.corvette.update();
		}
	}
}
