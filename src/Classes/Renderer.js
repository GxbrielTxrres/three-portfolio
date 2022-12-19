import * as THREE from "three";
import SceneDetails from "./SceneDetails";

export default class Renderer {
	constructor() {
		this.details = new SceneDetails();

		this.canvas = this.details.canvas;
		this.sizes = this.details.sizes;
		this.scene = this.details.scene;
		this.camera = this.details.camera;

		this.setInstance();
	}

	setInstance() {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});

		this.instance.physicallyCorrectLights = true;
		this.instance.outputEncoding = THREE.sRGBEncoding;
		this.instance.toneMapping = THREE.CineonToneMapping;
		this.instance.toneMappingExposure = 1.75;
		this.instance.shadowMap.enabled = true;
		this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
		this.instance.setClearColor("#000000");
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.ratio);
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.ratio);
	}

	update() {
		this.instance.render(this.scene, this.camera.instance);
	}
}
