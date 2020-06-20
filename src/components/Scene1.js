import React from "react";
import Shape from "./Shape";
import { range } from "lodash";

export default () => {
  const renderCircle = () => {
    return range(0, 360, 20).map((rot, i) => {
      const hasTexture = i % 2 === 0;
      if (hasTexture) {
        return (
          <Shape
            key={i}
            url="/svg/feather.svg"
            rotation={rot}
            textureUrl={"/img/mosaic.jpg"}
            position={[0, 0, 100]}
          />
        );
      }
      return (
        <Shape
          key={i}
          fillColor="#2a9d8f"
          url="/svg/leaf-simple.svg"
          rotation={rot}
          opacity={0.8}
          position={[0, 0, 1]}
        />
      );
    });
  };

  return (
    <>
      <Shape
        url="/svg/hexagon.svg"
        fillColor="#264653"
        position={[0, 0, -100]}
        scale={20}
        opacity={0.25}
      />

      {renderCircle()}
    </>
  );
};
