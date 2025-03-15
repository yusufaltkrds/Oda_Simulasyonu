import * as THREE from 'three';
import { modelConfigs } from "./modelconfigs.js";
import { DefaultModelLoader } from './DefaultModelLoader.js';

export class InteractionManager {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.selectedModel = null;
  }

  addInteractionListener(comboBox) {
    window.addEventListener("click", (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length > 0) {
        // Önceki seçimi sıfırla
        if (this.selectedObject) {
          this.selectedObject.material.emissive.set(0x000000); // Seçili objeyi varsayılana döndür
        }
    
        // Yeni seçimi ayarla
        this.selectedObject = intersects[0].object;
        this.selectedObject.material.emissive.set(0xff0000); // Seçili objeyi kırmızı ile vurgula
    
       
        this.selectedModel = this.selectedObject.parent || this.selectedObject; // Mesh yerine grubu seçin
    
        const selectedType = this.selectedObject.userData.type;

        this.updateComboBox(comboBox, selectedType);
        this.updateRotationSliders();
        this.updateScaleSliders();
        this.updateSliders();
      }
    });

      comboBox.addEventListener("change", (event) => {
      const selectedValue = event.target.value;
      console.log("ComboBox seçimi:", selectedValue);
      if (selectedValue && this.selectedModel) {
        const oldModelName = this.selectedModel.name;
        const newModelName = selectedValue;

        // Modeli değiştir
        const modelLoader = new DefaultModelLoader(this.scene);
        modelLoader.removeModelByName(oldModelName);
        modelLoader.loadModelByName(newModelName, (model) => {
          this.selectedModel = model;
        });
      }
    });
  }

  
  // ComboBox'u seçili mobilyanın türüne göre güncelle

  updateComboBox(comboBox, selectedType) {
    if (!comboBox || !(comboBox instanceof HTMLElement)) {
      console.error("ComboBox DOM öğesi doğru değil:", comboBox);
      return;
    }
  
    // Önce mevcut seçenekleri temizle
    comboBox.innerHTML = "<option value=''>Seçim yapın</option>";

    // Seçilen türe ait modelleri filtrele
    const filteredModels = modelConfigs.filter((config) => config.type === selectedType);
    filteredModels.forEach((model) => {
      const option = document.createElement("option");
      option.value = model.name;
      option.textContent = model.name;
      comboBox.appendChild(option);
    });

    console.log(`ComboBox, "${selectedType}" türüne göre güncellendi.`);
  }
  updateSliders() {
    if (!this.selectedModel) return;

    // Slider'ları seç
    const sliderX = document.getElementById("slider-x");
    const sliderY = document.getElementById("slider-y");
    const sliderZ = document.getElementById("slider-z");

    // Mevcut konum değerlerini slider'lara aktar
    sliderX.value = this.selectedModel.position.x;
    sliderY.value = this.selectedModel.position.y;
    sliderZ.value = this.selectedModel.position.z;

    // Slider değişikliklerini dinle
    sliderX.addEventListener("input", (event) => {
      this.selectedModel.position.x = parseFloat(event.target.value);
    });

    sliderY.addEventListener("input", (event) => {
      this.selectedModel.position.y = parseFloat(event.target.value);
    });

    sliderZ.addEventListener("input", (event) => {
      this.selectedModel.position.z = parseFloat(event.target.value);
    });
  }
  updateScaleSliders() {
    if (!this.selectedModel) return;
  
    // Ölçek slider'larını seç
    const scaleX = document.getElementById("scale-x");
    const scaleY = document.getElementById("scale-y");
    const scaleZ = document.getElementById("scale-z");
  
    // Mevcut ölçek değerlerini slider'lara aktar
    scaleX.value = this.selectedModel.scale.x;
    scaleY.value = this.selectedModel.scale.y;
    scaleZ.value = this.selectedModel.scale.z;
  
    // Slider değişikliklerini dinle
    scaleX.addEventListener("input", (event) => {
      this.selectedModel.scale.x = parseFloat(event.target.value);
    });
  
    scaleY.addEventListener("input", (event) => {
      this.selectedModel.scale.y = parseFloat(event.target.value);
    });
  
    scaleZ.addEventListener("input", (event) => {
      this.selectedModel.scale.z = parseFloat(event.target.value);
    });
  }
  
  updateRotationSliders() {
    if (!this.selectedModel) return;

    // Rotation slider'ları seç
    const rotateX = document.getElementById("rotate-x");
    const rotateY = document.getElementById("rotate-y");
    const rotateZ = document.getElementById("rotate-z");

    // Mevcut dönüş değerlerini slider'lara aktar (radyan -> derece)
    rotateX.value = THREE.MathUtils.radToDeg(this.selectedModel.rotation.x);
    rotateY.value = THREE.MathUtils.radToDeg(this.selectedModel.rotation.y);
    rotateZ.value = THREE.MathUtils.radToDeg(this.selectedModel.rotation.z);

    // Slider değişikliklerini dinle
    rotateX.addEventListener("input", (event) => {
      this.selectedModel.rotation.x = THREE.MathUtils.degToRad(parseFloat(event.target.value));
    });

    rotateY.addEventListener("input", (event) => {
      this.selectedModel.rotation.y = THREE.MathUtils.degToRad(parseFloat(event.target.value));
    });

    rotateZ.addEventListener("input", (event) => {
      this.selectedModel.rotation.z = THREE.MathUtils.degToRad(parseFloat(event.target.value));
    });
  }
}
