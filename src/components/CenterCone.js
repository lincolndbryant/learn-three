import { TEAL } from "../constants/colors";
import { a, useSpring } from "react-spring/three";
import React from "react";

const CenterCone = () => {
  const springProps = useSpring({
    loop: true,
    to: { number: 4, scale: 1.5, zPos: 0 },
    from: { number: 1, scale: 1, zPos: 0 },
    config: { duration: 7000 },
    reset: true,
  });

  return (
    <a.mesh
      name="cone"
      rotation={[Math.PI / 2, 0, 0]}
      position-z={springProps.zPos}
      scale-x={springProps.scale}
      scale-y={springProps.scale}
      scale-z={springProps.scale}
      castShadow
    >
      <coneGeometry attach="geometry" args={[200, 200, 32]} />
      <meshStandardMaterial attach="material" color={TEAL} />
    </a.mesh>
  );
};

export default CenterCone;
