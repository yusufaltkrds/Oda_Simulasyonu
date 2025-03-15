import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class SceneManager {
  constructor() {
    // Sahne oluşturma
    this.scene = new THREE.Scene();

    // Kamera oluşturma
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.set(0, 2, 5);

    // Renderer oluşturma
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Yumuşak gölgeler
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.5;

    const container = document.getElementById("container");
container.appendChild(this.renderer.domElement);

    // OrbitControls oluşturma
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // Yumuşak hareket
    this.controls.dampingFactor = 0.05; // Yumuşaklık derecesi
    this.controls.screenSpacePanning = false; // Yatay eksende kaymayı kapat
    this.controls.minDistance = 2; // Minimum yakınlaştırma mesafesi
    this.controls.maxDistance = 10; // Maksimum uzaklaştırma mesafesi
    this.controls.maxPolarAngle = Math.PI / 2; // Kameranın aşağıya bakmasını sınırla
  }

  update() {
    this.controls.update(); // Kontrollerin güncellenmesi
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
