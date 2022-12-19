import * as THREE from "three";
import Sizes from "./UtilsFolder/Sizes";
import Time from "./UtilsFolder/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./UtilsFolder/Resources";
import Sources from "./Sources";
import Debug from "./UtilsFolder/Debug";

let details = null;

export default class SceneDetails {
	constructor(canvas) {
		//CONVERT TO SINGLETON
		if (details) {
			return details;
		}
		window.details = this;
		details = this;

		//OPTIONS
		this.canvas = canvas;

		//SETUP
		this.debug = new Debug();
		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.resources = new Resources(Sources);
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.world = new World();

		//Sizes Resize Event
		this.sizes.on("resize", () => {
			this.resize();
		});

		//LISTEN TO TICK EVENT
		this.time.on("tick", () => {
			this.update();
		});
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		this.camera.update();
		this.world.update();
		this.renderer.update();
	}

	destroy() {
		this.sizes.off("resize");
		this.time.off("tick");

		//TRAVERSE THE WHOLE SCENE
		this.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose();

				for (const key in child.material) {
					const value = child.material[key];

					if (value && typeof value.dispose === "function") {
						value.dispose();
					}
				}
			}
		});

		this.camera.controls.dispose();
		this.renderer.instance.dispose();

		if (this.debug.active) {
			this.debug.ui.destroy();
		}
	}
}
