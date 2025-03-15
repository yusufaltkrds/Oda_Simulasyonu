import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";
import * as THREE from 'three';


export class BackgroundManager {
  constructor(scene, path) {
    this.scene = scene;
    this.path = path;

    this.loadBackground(this.path);
  }

  loadBackground(path) {
    const loader = new EXRLoader();
    loader.load(path, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = texture;
      this.scene.background = texture;
      console.log("Arka plan yüklendi.");
    });
  }
}
