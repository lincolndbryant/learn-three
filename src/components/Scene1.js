import React from "react";
import { range } from "lodash";
import { MathUtils } from "three";
import Shape from "./Shape";

export default () => {
  const renderCircle = () => {
    return range(0, 360 * 4, 20).map((rot, i) => {
      const hasTexture = i % 2 === 0 && rot <= 360;
      if (hasTexture) {
        return (
          <Shape
            key={i}
            id={i}
            url="/svg/drop.svg"
            rotation={rot}
            textureUrl={"/img/mosaic.jpg"}
            position={[0, 0, 1]}
            depth={10}
          />
        );
      }

      const rad = MathUtils.degToRad(rot);
      return (
        <Shape
          key={i}
          id={i}
          fillColor="#2a9d8f"
          url="/svg/drop-narrow.svg"
          rotation={-rot}
          opacity={0.8}
          position={[Math.sin(rad) * 400, Math.cos(rad) * 400, 2 * i]}
          scale={Math.max(1 - i * 0.02, 0.1)}
          depth={5}
        />
      );
    });
  };

  return (
    <>
      <Shape
        url="/svg/hexagon.svg"
        textureUrl={"/img/dark-stone.jpg"}
        name="hexagon"
        // fillColor="#264653"
        position={[0, 0, -100]}
        scale={10}
        depth={1}
      />

      {renderCircle()}
    </>
  );
};
