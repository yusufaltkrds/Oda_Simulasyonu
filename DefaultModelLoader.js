import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { modelConfigs } from "./modelconfigs";

export class DefaultModelLoader {
  constructor(scene) {
    this.scene = scene;            // THREE.js sahnesi
    this.loader = new GLTFLoader();
    this.models = {};              // Yüklenen modellerin referansları
  }

  // Tüm modelleri yükleme fonksiyonu
  loadModelByName(name, callback) {
    const config = modelConfigs.find((model) => model.name === name);
    if (!config) {
      console.error(`"${name}" adında bir model bulunamadı.`);
      return;
    }

    // Modeli yükle
    this.loader.load(
      config.path,
      (gltf) => {
        const model = gltf.scene;

        // Konfigürasyona göre pozisyon, ölçek ve rotasyon ayarı
        model.position.set(...config.position);
        model.scale.set(...config.scale);
        model.rotation.set(...config.rotation);

        model.name = config.name;// Modele isim ver
        this.scene.add(model);   // Sahneye ekle
        
        if(model.name == "room"){
          model.traverse((child) => {
            child.raycast = () => {};
          })
        }
        model.traverse((child) => {
          child.userData.type = config.type;
          child.userData.name = config.name;
        })

        console.log(`"${model.name}" modeli başarıyla yüklendi.`);

      },
      undefined,
      (error) => {
        console.error(`"${name}" modeli yüklenirken hata oluştu:`, error);
      }
    );
  }
  removeModelByName(name) {
    // Sahnedeki modeli isme göre bul
    const model = this.scene.getObjectByName(name); // Bu bir THREE.Object3D nesnesi döndürür
    console.log(`"Adı: ${name}" modeli kaldırılmaya çalışılıyor...`);

    if (model) {
        // Kök parent'ı bul (sahneye direkt bağlı olan modeli)
        let rootModel = model;
        while (rootModel.parent && rootModel.parent.type !== "Scene") {
            rootModel = rootModel.parent;
        }

        console.log(`Kök model: ${rootModel.name}`);
        // Sahnedeki modeli kaldır
        rootModel.removeFromParent();
        console.log(`"${rootModel.name}" kök modeli başarıyla sahneden kaldırıldı.`);
    } else {
        console.warn(`"${name}" modeli sahnede bulunamadı.`);
    }

    // Sahne içeriğini yazdır (kontrol için)
    console.log("Kalan sahne nesneleri:", this.scene.children.map(obj => obj.name));
}



  
}
