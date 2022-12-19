import * as THREE from "three";
import SceneDetails from "../SceneDetails";
import { Reflector } from "three/examples/jsm/objects/Reflector";
export default class Floor {
	constructor() {
		this.details = new SceneDetails();
		this.scene = this.details.scene;
		this.resources = this.details.resources;

		this.setGeometry();
		this.setTextures();
		this.setMaterial();
		this.setMesh();
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(20, 20);
	}

	setTextures() {
		this.textures = {};

		this.textures.color = this.resources.items.grassColorTexture;
		this.textures.color.encoding = THREE.sRGBEncoding;
		this.textures.color.repeat.set(1.5, 1.5);
		this.textures.color.wrapS = THREE.RepeatWrapping;
		this.textures.color.wrapT = THREE.RepeatWrapping;

		this.textures.normal = this.resources.items.grassNormalTexture;
		this.textures.normal.repeat.set(1.5, 1.5);
		this.textures.normal.wrapS = THREE.RepeatWrapping;
		this.textures.normal.wrapT = THREE.RepeatWrapping;
	}

	setMaterial() {
		this.reflector = new Reflector(this.geometry, {
			clipBias: 0.003,
			textureWidth: this.details.sizes.width * this.details.sizes.ratio,
			textureHeight: this.details.sizes.height * this.details.sizes.ratio,
			color: 0x889999,
		});

		this.reflector.receiveShadow = true;
		this.reflector.rotateX(-Math.PI * 0.5);
		this.scene.add(this.reflector);
	}

	setMesh() {
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.rotation.x = -Math.PI / 2;
		this.mesh.receiveShadow = true;
		// this.scene.add(this.mesh);
	}
}
