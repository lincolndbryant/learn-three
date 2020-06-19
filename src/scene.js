import { PerspectiveCamera, WebGLRenderer } from "three";
import * as THREE from "three-full";

const onWindowResize = (e) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const loader = new THREE.SVGLoader();
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
      let texture;

      if (opts.textureUrl) {
        texture = new THREE.TextureLoader().load(opts.textureUrl);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.001, 0.001);
      }
      const material = new THREE.MeshBasicMaterial({
        map: opts.textureUrl ? texture : null,
        color: opts.fillColor,
        opacity: opts.opacity,
        transparent: true,
      });

      paths.forEach(path => {
        let shapes = path.toShapes(true);
        shapes.forEach(shape => {
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

export function initScene() {
  let container = document.getElementById("container");

  camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    10,
    10000
  );
  camera.position.set(0, 0, 500);

  renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.screenSpacePanning = true;

  scene = new THREE.Scene();
  scene.autoUpdate = true;
  scene.background = new THREE.Color(0xb0b0b0);

  let helper = new THREE.GridHelper(320, 10);
  camera.lookAt(scene.position);
  helper.rotation.x = Math.PI / 2;
  scene.add(helper);

  window.addEventListener("resize", onWindowResize, false);
}

export function animate() {
  var speed = Date.now() * 0.00025;
  camera.rotation.z = speed;
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}
