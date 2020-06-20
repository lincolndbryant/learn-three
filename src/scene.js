import {
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  MeshBasicMaterial,
  MathUtils,
} from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import Stats from "stats-js";
import { MOONLIGHT, SLATE, SUNLIGHT } from "./constants/colors";

const onWindowResize = (e) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
};

const onClick = (e) => {
  var intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const intersectObj = intersects[0].object;
    console.log(intersectObj);
    if (intersectObj.type !== "Mesh") {
      return;
    }
    outlinePass.selectedObjects = [intersectObj];
    if (intersectObj._outline) {
      scene.remove(intersectObj._outline);
      delete intersectObj._outline;
    } else {
      var outlineMaterial2 = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.BackSide,
        wireframe: true,
        wireframeLinewidth: 10,
        wireframeLinejoin: true,
      });
      var outlineMesh2 = intersectObj.clone(true);
      outlineMesh2.name = `outline-${intersectObj.name}`;
      outlineMesh2.material = outlineMaterial2;
      scene.add(outlineMesh2);
      intersectObj._outline = outlineMesh2;
    }
  }
};

const loader = new SVGLoader();
let scene;
let renderer;
let camera;
let composer;
let outlinePass;

const EXTRUDE_DEFAULTS = {
  bevelEnabled: false,
  steps: 1,
  depth: 5, //extrusion depth, don't define an extrudePath
  material: 0, //material index of the front and back face
  extrudeMaterial: 1, //material index of the side faces
};

let _id = 0;

const uniqueId = () => _id++;

export function loadSVG(url, key, opts) {
  const scale = opts.scale || 1;
  const translateX = opts.translateX || 0;
  const translateY = opts.translateY || 0;
  const { position } = opts;

  return new Promise((resolve) => {
    loader.load(url, function (data) {
      let paths = data.paths;
      let group = new THREE.Group();
      let materialOpts = {
        opacity: opts.opacity || 1,
        transparent: true,
      };

      if (opts.textureUrl) {
        const texture = new TextureLoader().load(opts.textureUrl);
        texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(0.001 * scale, 0.001 * scale);
        materialOpts.map = texture;
      }
      if (opts.fillColor) {
        materialOpts.color = opts.fillColor;
      }
      const material = new MeshBasicMaterial(materialOpts);
      const extrudeSettings = {
        ...EXTRUDE_DEFAULTS,
        depth: opts.depth || 1,
      };
      paths.forEach((path) => {
        let shapes = path.toShapes(true);
        shapes.forEach((shape) => {
          let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          let mesh = new THREE.Mesh(geometry, material);
          mesh.name = opts.name || `obj-${uniqueId()}`;
          mesh.receiveShadow = true;

          if (scale) {
            mesh.scale.set(scale, scale, scale);
          }
          if (opts.rotation) {
            mesh.rotateZ(MathUtils.degToRad(opts.rotation));
          }
          mesh.position.set(
            position[0] + translateX,
            position[1] + translateY,
            position[2]
          );
          group.add(mesh);
        });
      });

      scene.add(group);
      resolve(group);
    });
  });
}

let startAt;
let stats;
let raycaster;
let animating = false;
let mouse = new THREE.Vector2();
let gridHelper;
let pausedMs = 0;
let elapsedMs = 0;

const onMouseMove = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
};

export function initScene() {
  let container = document.getElementById("container");

  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    10,
    10000
  );
  camera.position.set(0, 0, 1000);

  raycaster = new THREE.Raycaster();

  renderer = new WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.sortObjects = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);

  var controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;

  scene = new THREE.Scene();
  scene.autoUpdate = true;

  gridHelper = new THREE.GridHelper(1000, 10);
  camera.lookAt(scene.position);
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);

  scene.add(new THREE.AmbientLight(MOONLIGHT, 0.1));
  scene.fog = new THREE.FogExp2(0xefd1b5, 0.0001);

  const light1 = new THREE.DirectionalLight(SUNLIGHT, 5);
  light1.position.set(0, 1, 500);
  light1.castShadow = true;
  scene.add(light1);
  scene.add(light1.target);

  var sphereGeometry = new THREE.SphereBufferGeometry(50, 32, 32);
  var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(0, 0, 100);
  sphere.castShadow = true; //default is false
  sphere.receiveShadow = false; //default
  scene.add(sphere);

  var planeGeometry = new THREE.PlaneBufferGeometry(800, 800, 32, 32);
  var planeMaterial = new THREE.MeshStandardMaterial({ color: SLATE });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  scene.add(plane);

  var helper = new THREE.CameraHelper(light1.shadow.camera);
  scene.add(helper);

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onMouseMove, false);
  document.addEventListener("click", onClick, false);
  window._scene = scene;

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
  composer.render();
  stats.update();
  window.requestAnimationFrame(renderScene);
}

export function setAnimating(_animating) {
  animating = _animating;
}
