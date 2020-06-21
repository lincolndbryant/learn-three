import * as THREE from "three";
import { TextureLoader, MeshBasicMaterial, MathUtils } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

const EXTRUDE_DEFAULTS = {
  bevelEnabled: false,
  steps: 1,
  depth: 5, //extrusion depth, don't define an extrudePath
  material: 0, //material index of the front and back face
  extrudeMaterial: 1, //material index of the side faces
};

const loader = new SVGLoader();

export const range = (start, stop, step = 1) => {
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
};

let _id = 0;

const uniqueId = () => _id++;

export function loadSVG(url, opts) {
  const { scene } = window;
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
