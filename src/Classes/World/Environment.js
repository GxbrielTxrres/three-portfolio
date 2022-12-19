import * as THREE from "three";
import SceneDetails from "../SceneDetails";

export default class Environment {
	constructor() {
		this.details = new SceneDetails();
		this.scene = this.details.scene;
		this.resources = this.details.resources;
		this.debug = this.details.debug;

		//DEBUG
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder("Environment");
			this.debugFolder.close();
		}

		this.setSunLight();
		this.setEnvironmentMap();
	}

	setSunLight() {
		this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
		this.sunLight.castShadow = true;
		this.sunLight.shadow.camera.far = 15;
		this.sunLight.shadow.mapSize.set(1024, 1024);
		this.sunLight.shadow.normalBias = 0.05;
		this.sunLight.position.set(3, 3, -2.25);
		this.scene.add(this.sunLight);

		if (this.debug.active) {
			this.debugFolder
				.add(this.sunLight, "intensity")
				.min(0)
				.max(10)
				.step(0.001)
				.name("SunIntensity");

			this.debugFolder
				.add(this.sunLight.position, "x")
				.min(-10)
				.max(10)
				.step(0.001)
				.name("sunX");
			this.debugFolder
				.add(this.sunLight.position, "y")
				.min(-10)
				.max(10)
				.step(0.001)
				.name("sunY");
			this.debugFolder
				.add(this.sunLight.position, "z")
				.min(-10)
				.max(10)
				.step(0.001)
				.name("sunZ");
		}
	}

	setEnvironmentMap() {
		this.environmentMap = {};
		this.environmentMap.intensity = 0.4;
		this.environmentMap.texture = this.resources.items.envMapTexture;
		this.environmentMap.encoding = THREE.sRGBEncoding;
		this.scene.environment = this.environmentMap.texture;

		this.environmentMap.updateMaterials = () => {
			this.scene.traverse((child) => {
				if (
					child instanceof THREE.Mesh &&
					child.material instanceof THREE.MeshStandardMaterial
				) {
					child.material.envMap = this.environmentMap.texture;
					child.material.envMapIntensity =
						this.environmentMap.intensity;
					child.material.needsUpdate = true;
				}
			});
		};

		this.environmentMap.updateMaterials();

		//DEBUG
		if (this.debug.active) {
			this.debugFolder
				.add(this.environmentMap, "intensity")
				.min(0)
				.max(5)
				.step(0.001)
				.name("envMapIntensity")
				.onChange(this.environmentMap.updateMaterials);
		}
	}
}
