import { PerspectiveCamera, WebGLRenderer } from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import Stats from "stats-js";
import { initGui } from "./scene/gui";

let scene;
let renderer;
let camera;
let composer;
let outlinePass;
let startAt;
let stats;
let raycaster;
let sunlight;
let animating = false;
let mouse = new THREE.Vector2();
let gridHelper;
let pausedMs = 0;
let elapsedMs = 0;

const onWindowResize = (e) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
  if (window.strokeMaterial) {
    window.strokeMaterial.resolution.set(window.innerWidth, window.innerHeight);
  }
};

const onClick = () => {
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const intersectObj = intersects[0].object;
    console.log(intersectObj);
    if (intersectObj.type !== "Mesh") {
      return;
    }
    outlinePass.selectedObjects = [intersectObj];
  }
};

const onMouseMove = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
};

function setupDebugLights() {
  sunlight = new THREE.PointLight("#ffffff", 1);
  sunlight.decay = 1;
  sunlight.position.set(0, 0, 200);
  // sunlight.rotation.x = Math.PI / 2;
  sunlight.castShadow = true;
  scene.add(sunlight);

  const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 2);
  scene.add(ambientLight);

  scene.userData.sunlight = sunlight;
}

export function initScene() {
  let container = document.getElementById("container");

  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    10,
    100000
  );
  camera.position.set(0, 0, 2500);

  raycaster = new THREE.Raycaster();

  renderer = new WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.screenSpacePanning = true;
  // controls.autoRotate = true;
  scene = new THREE.Scene();
  scene.autoUpdate = true;
  setupDebugLights();

  gridHelper = new THREE.GridHelper(1000, 10);
  camera.lookAt(scene.position);
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);

  composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene,
    camera
  );
  outlinePass.edgeStrength = 5;
  outlinePass.edgeGlow = 1;
  outlinePass.edgeThickness = 5;
  outlinePass.visibleEdgeColor = new THREE.Color("#00ff00");
  composer.addPass(outlinePass);

  stats = new Stats();
  document.body.append(stats.domElement);
  startAt = Date.now();

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onMouseMove, false);
  document.addEventListener("click", onClick, false);
  window._scene = scene;
  initGui(scene);

  return scene;
}

export function renderScene(now) {
  if (!startAt) {
    startAt = now;
  }

  if (animating) {
    elapsedMs = now - startAt - pausedMs;
  } else {
    pausedMs = now - startAt - elapsedMs;
  }
  camera.rotation.z = (elapsedMs * 0.00025) % 360;
  camera.updateMatrixWorld();
  raycaster.setFromCamera(mouse, camera);
  renderer.clearDepth();
  composer.render();
  stats.update();
  window.requestAnimationFrame(renderScene);
}

export function setAnimating(_animating) {
  animating = _animating;
}

export function clearScene(layerId) {
  let shapes = scene.children.filter((s) => s.type === "Group");
  if (layerId) {
    shapes = shapes.filter((s) => s.userData.layerId === layerId);
  }
  console.log(`clearing scene layer ${layerId} of children`, shapes);
  shapes.forEach((shape) => scene.remove(shape));
}
