import { GUI } from "three/examples/jsm/libs/dat.gui.module";

const GUI_CONTROLS = [
  ["numPoints", 3, 16, 1],
  ["radius", 0, 500, 20],
];

let gui;

export const initGui = (scene) => {
  gui = new GUI({ width: 350, autoPlace: true });
  const sceneFolder = gui.addFolder("Scene");
  const { sunlight } = scene.userData;
  if (sunlight) {
    sceneFolder.add(sunlight, "intensity", 0.1, 10);
  }
};

const createLayer = (layer, updateLayer) => {
  const layerFolder = gui.addFolder(`Layer ${layer.id}`);
  GUI_CONTROLS.forEach((controlArgs) => {
    const [propName] = controlArgs;
    const controller = layerFolder.add.apply(layerFolder, [
      layer,
      ...controlArgs,
    ]);
    controller.onFinishChange((val) => {
      updateLayer(layer.id, propName, val);
    });
  });

  const controller = layerFolder.addColor(layer, "fillColor");
  controller.onFinishChange((val) => {
    updateLayer(layer.id, "fillColor", val);
  });
};

export function createLayerControls(layers = [], updateLayer) {
  layers.forEach((layer) => createLayer(layer, updateLayer));
}
