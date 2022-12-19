import SceneDetails from "../SceneDetails";
import * as THREE from "three";
import gsap from "gsap";

export default class Corvette {
	constructor() {
		this.details = new SceneDetails();
		this.scene = this.details.scene;
		this.resources = this.details.resources;
		this.time = this.details.time;
		this.debug = this.details.debug;
		this.camera = this.details.camera.instance;

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder("Car Colors");
			this.debugFolder.close();
		}

		const carParts = [
			{ number: 17, name: "CarColor" },
			{ number: 106, name: "Headlights" },
			{ number: 89, name: "Trim" },
			{ number: 203, name: "Accent" },
			{ number: 19, name: "Window Tint" },
			{ number: 201, name: "Lug Nuts" },
			{ number: 204, name: "Wheels" },
			{ number: 202, name: "Rims" },
			{ number: 237, name: "Brakes" },
			{ number: 239, name: "Rotars" },
		];

		//SETUP
		this.resource = this.resources.items.corvetteModel;

		this.setModel();
		this.grabObj(carParts);
		this.setIntro();
	}

	setModel() {
		this.model = this.resource.scene;
		this.model.scale.set(1, 1, 1);
		this.scene.add(this.model);
		this.scene.add(this.camera);

		this.model.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
			}
		});
	}

	setAnimation() {
		this.animation = {};
		console.log(this.resource.animations);
		this.animation.mixer = new THREE.AnimationMixer(this.model);

		this.animation.actions = {};
		this.animation.actions.sway = this.animation.mixer.clipAction(
			this.resource.animations[0],
		);
		this.animation.actions.walk = this.animation.mixer.clipAction(
			this.resource.animations[1],
		);
		this.animation.actions.run = this.animation.mixer.clipAction(
			this.resource.animations[2],
		);

		this.animation.actions.current = this.animation.actions.sway;
		this.animation.actions.current.play();

		this.animation.play = (name) => {
			const newAction = this.animation.actions[name];
			const oldAction = this.animation.actions.current;

			newAction.reset();
			newAction.play();
			newAction.crossFadeFrom(oldAction, 1);

			this.animation.actions.current = newAction;
		};

		if (this.debug.active) {
			const debugObject = {
				playSway: () => {
					this.animation.play("sway");
				},
				playWalk: () => {
					this.animation.play("walk");
				},
				playRun: () => {
					this.animation.play("run");
				},
			};

			this.debugFolder.add(debugObject, "playSway").name("Swaying");
			this.debugFolder.add(debugObject, "playWalk").name("Walking");
			this.debugFolder.add(debugObject, "playRun").name("Running");
		}
	}

	update() {
		this.camera.position.x =
			(0.2 / Math.sin(this.time.elapsedTime * 0.0001)) * 0.7;
		this.camera.position.z =
			1.5 * Math.cos(this.time.elapsedTime * 0.0001) * 7;
	}

	setIntro() {
		gsap.fromTo(
			this.camera.position,
			{ y: 3, z: -5 },
			{ x: 7, y: 3, z: 12, duration: 3 },
		);
		gsap.fromTo(
			this.camera.position,
			{ x: 7, y: 3, z: 12 },
			{ x: 0, z: 7.4, delay: 2.5, duration: 3 },
		);
	}

	grabObj(args) {
		if (this.debug.active) {
			const params = {
				color: 0xffffff,
			};

			args.map((property) => {
				this.debugFolder
					.addColor(params, "color")
					.onChange(() => {
						this.model
							.getObjectByName(
								"Object_" + property.number.toString() ||
									property.name,
							)
							.material.color.setHex(params.color);
					})
					.name(property.name ? property.name : "Color Picker");
			});
		}
	}
}
