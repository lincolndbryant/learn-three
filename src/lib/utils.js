import * as THREE from "three";
import { TextureLoader, MeshBasicMaterial, MathUtils } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { TEAL } from "../constants/colors";
import { MeshLine, MeshLineMaterial } from "threejs-meshline";

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

window.SVGs = {};

export function loadSVG(url, opts) {
  const { scene } = window;
  const scale = opts.scale || 1;
  const translateX = opts.translateX || 0;
  const translateY = opts.translateY || 0;
  const { position } = opts;

  return new Promise((resolve) => {
    loader.load(url, function (data) {
      window.SVGs[url] = data;
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
      const strokeMaterial = new MeshLineMaterial({
        lineWidth: 50,
        color: opts.strokeColor || TEAL,
        sizeAttenuation: 0,
        depthTest: false,
        // depthWrite: false,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      });

      const extrudeSettings = {
        ...EXTRUDE_DEFAULTS,
        depth: opts.depth || 1,
      };
      paths.forEach((path) => {
        window.path = path;
        path.autoClose = true;
        let shapes = path.toShapes(true);
        shapes.forEach((shape) => {
          shape.closePath();
          let geometry = new THREE.ShapeBufferGeometry(shape);
          if (opts.extrude) {
            geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          }

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

          mesh.updateMatrix(true);
          // mesh.matrixWorld.identity();
          // mesh.geometry.applyMatrix4(mesh.matrixWorld);
          // group.add(mesh);

          if (opts.drawStrokes2) {
            const ml = new MeshLine();
            ml.setMatrixWorld(mesh.matrixWorld);
            ml.setFromGeometry(mesh.geometry);
            const meshLine = new THREE.Mesh(ml.geometry, strokeMaterial);
            meshLine.updateMatrixWorld();
            group.add(meshLine);
          }

          if (opts.drawStrokes) {
            const ml = new MeshLine();
            //ml.setMatrixWorld(mesh.matrixWorld);
            ml.setFromGeometry(path.subPaths[0].createPointsGeometry());
            const meshLine = new THREE.Mesh(ml.geometry, strokeMaterial);
            meshLine.geometry.applyMatrix4(mesh.matrix);
            group.add(meshLine);
          }
        });

      });

      scene.add(group);
      resolve(group);
    });
  });
}
