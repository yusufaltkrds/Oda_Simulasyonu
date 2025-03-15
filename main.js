import { DefaultModelLoader }  from './DefaultModelLoader.js';
import { SceneManager } from "./SceneManager.js";
import { BackgroundManager } from "./BackgroundManager.js";
import { InteractionManager } from "./InteractionManager.js";

// Sahne oluşturma
const sceneManager = new SceneManager();
const backgroundManager = new BackgroundManager(sceneManager.scene, "background_2.exr");
const interactionManager = new InteractionManager(sceneManager.scene, sceneManager.camera);



const modelLoader = new DefaultModelLoader(sceneManager.scene);

modelLoader.loadModelByName("room",(model) => {
  console.log("Modeli yüklendi:", model);
});
modelLoader.loadModelByName("armchair",(model) => {
  console.log("Modeli yüklendi:", model);
});
modelLoader.loadModelByName("sofa_5",(model) => {
  console.log("Modeli yüklendi:", model);
});
modelLoader.loadModelByName("tv",(model) => {
  console.log("Modeli yüklendi:", model);
});
modelLoader.loadModelByName("tv_table_5",(model) => {
  console.log("Modeli yüklendi:", model);
});
modelLoader.loadModelByName("carpet_5",(model) => {
  console.log("Modeli yüklendi:", model);
});
modelLoader.loadModelByName("decoration",(model) => {
  console.log("Modeli yüklendi:", model);
});
modelLoader.loadModelByName("picture_2",(model) => {
  console.log("Modeli yüklendi:", model);
});
modelLoader.loadModelByName("bookshelf_3",(model) => {
  console.log("Modeli yüklendi:", model);
});
modelLoader.loadModelByName("table_3",(model) => {
  console.log("Modeli yüklendi:", model);
});

const comboBox = document.getElementById("mobilya-combo");

interactionManager.addInteractionListener(comboBox);

// Animasyon döngüsü
function animate() {
    requestAnimationFrame(animate);
    
    sceneManager.update();

    sceneManager.render();
  }
  animate();

