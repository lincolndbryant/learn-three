import * as THREE from "three";

export const range = (start, stop, step = 1) => {
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
};

export function pick(o, ...props) {
  return Object.assign({}, ...props.map((prop) => ({ [prop]: o[prop] })));
}

let _id = 0;

const uniqueId = () => _id++;

export const processSVG = (svgData) => {
  const processed = svgData.paths.flatMap((path, index) => {
    const shapes = path.toShapes(true);
    return shapes.map((shape) => {
      return {
        shape,
        geometry: new THREE.Geometry().setFromPoints(shape.getPoints()),
        color: path.color,
        index,
      };
    });
  });
  console.log(processed[0]);
  return processed[0];
};
