import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SceneDetails from "./SceneDetails";

export default class Camera {
	constructor() {
		this.details = new SceneDetails();
		this.scene = this.details.scene;
		this.sizes = this.details.sizes;
		this.canvas = this.details.canvas;
		this.time = this.details.time;

		this.setInstance();
		this.setOrbitControls();
	}

	setInstance() {
		//CREATEA CAMEREA
		this.instance = new THREE.PerspectiveCamera(
			35,
			this.sizes.width / this.sizes.height,
			0.1,
			100,
		);

		//POSITION AND ADD CAM TO SCENE
		this.instance.position.set(6, 4, 8);
		this.scene.add(this.instance);
	}

	setOrbitControls() {
		this.controls = new OrbitControls(this.instance, this.canvas);
		this.controls.enableDamping = true;
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.updateProjectionMatrix();
	}

	update() {
		this.controls.update();
	}
}
