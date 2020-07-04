import React, { useMemo } from "react";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { extend, useLoader } from "react-three-fiber";
import { MOONLIGHT, TEAL } from "../constants/colors";
import * as THREE from "three";
import { pick, processSVG } from "../lib/utils";
import * as meshline from "threejs-meshline";

extend(meshline);

const EXTRUDE_DEFAULTS = {
  bevelEnabled: false,
  steps: 1,
  depth: 20, //extrusion depth, don't define an extrudePath
  material: 0, //material index of the front and back face
  extrudeMaterial: 1, //material index of the side faces
};

const SVGShape = ({
  url,
  rotation,
  fillColor = TEAL,
  strokeWidth,
  ...rest
}) => {
  const svg = useLoader(SVGLoader, url);
  const shape = useMemo(() => processSVG(svg), [svg]);

  const [texture] = useLoader(
    THREE.TextureLoader,
    rest.textureUrl ? [rest.textureUrl] : []
  );
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.offset.set(0, 0);
    texture.repeat.set(0.001, 0.001);
  }

  const materialProps = {
    opacity: rest.opacity || 0.9,
    color: fillColor || shape.color,
  };
  const meshProps = {
    position: rest.position,
    rotation: [0, 0, rotation || 0],
    scale: rest.scale,
  };
  const extrudeSettings = {
    ...EXTRUDE_DEFAULTS,
    depth: rest.depth || 10,
  };
  const strokeSettings = {
    strokeWidth: strokeWidth,
    strokeColor: rest.strokeColor || MOONLIGHT,
  };

  const renderStroke = () => {
    return (
      <mesh {...meshProps}>
        <meshLine attach="geometry" geometry={shape.geometry} />
        <meshLineMaterial
          attach="material"
          depthTest={true}
          lineWidth={strokeWidth}
          color={strokeSettings.strokeColor}
          sizeAttenuation={true}
        />
      </mesh>
    );
  };

  return (
    <>
      <mesh {...meshProps}>
        <meshStandardMaterial
          attach="material"
          map={texture}
          transparent
          {...materialProps}
        />
        <extrudeGeometry
          attach="geometry"
          args={[shape.shape, extrudeSettings]}
        />
      </mesh>
      {strokeWidth && renderStroke()}
    </>
  );
};

export default SVGShape;
