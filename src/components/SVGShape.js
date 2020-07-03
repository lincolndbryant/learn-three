import React, {useMemo} from "react";
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader'
import {useLoader} from 'react-three-fiber'
import {TEAL} from "../constants/colors";
import * as THREE from "three";

const EXTRUDE_DEFAULTS = {
  bevelEnabled: false,
  steps: 1,
  depth: 20, //extrusion depth, don't define an extrudePath
  material: 0, //material index of the front and back face
  extrudeMaterial: 1, //material index of the side faces
};

const SVGShape = ({ url, rotation, fillColor = TEAL, ...rest }) => {
  const svg = useLoader(SVGLoader, url)
  const shape = useMemo(() => {
      return svg.paths.flatMap((path, index) =>
        path
          .toShapes(true)
          .map((shape) => ({shape, color: path.color, fillOpacity: path.userData.style.fillOpacity, index}))
      )[0]
    }, [svg]
  );

  const [texture] = useLoader(THREE.TextureLoader, rest.textureUrl ? [rest.textureUrl] : []);
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.offset.set(0, 0);
    texture.repeat.set(0.001 * 1, 0.001 * 1);
    console.log(texture);
  }

  return (
    <mesh rotation={[0, 0, rotation]} {...rest}>
      <meshStandardMaterial attach="material" color={fillColor || shape.color} map={texture} />
      <extrudeGeometry attach="geometry" args={[shape.shape, EXTRUDE_DEFAULTS]} />
    </mesh>
  )
};

export default SVGShape;
