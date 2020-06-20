import {
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  MeshBasicMaterial,
} from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import Stats from "stats-js";

const onWindowResize = (e) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const loader = new SVGLoader();
let scene;
let renderer;
let camera;

const extrudeSettings = {
  bevelEnabled: false,
  steps: 1,
  depth: 5, //extrusion depth, don't define an extrudePath
  material: 0, //material index of the front and back face
  extrudeMaterial: 1, //material index of the side faces
};

export function loadSVG(url, opts) {
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
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.001, 0.001);
        materialOpts.map = texture;
      }
      if (opts.fillColor) {
        materialOpts.color = opts.fillColor;
      }
      const material = new MeshBasicMaterial(materialOpts);

      paths.forEach((path) => {
        let shapes = path.toShapes(true);
        shapes.forEach((shape) => {
          let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          let mesh = new THREE.Mesh(geometry, material);
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
let animating = false;

export function initScene() {
  let container = document.getElementById("container");

  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    10,
    10000
  );
  camera.position.set(0, 0, 1000);

  renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  var controls = new OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;

  scene = new THREE.Scene();
  scene.autoUpdate = true;
  scene.background = new THREE.Color(0x111111);

  let helper = new THREE.GridHelper(1000, 10);
  camera.lookAt(scene.position);
  helper.rotation.x = Math.PI / 2;
  scene.add(helper);

  window.addEventListener("resize", onWindowResize, false);

  stats = new Stats();
  document.body.append(stats.domElement);
}

export function renderScene() {
  renderer.render(scene, camera);

  if (animating) {
    const elapsed = Date.now() - startAt;
    camera.rotation.z = (elapsed * 0.00025) % 360;
  }
  stats.update();

  window.requestAnimationFrame(renderScene);
}

export function setAnimating(_animating) {
  startAt = Date.now();

  animating = _animating;
}
