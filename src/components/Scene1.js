import React from "react";
import Shape from "./Shape";
import { range } from "lodash";

export default () => {
  const renderCircle = () => {
    return range(0, 360, 20).map((rot, i) => {
      const hasTexture = i % 2 == 0;
      if (hasTexture) {
        return (
          <Shape
            key={i}
            url="/svg/feather.svg"
            rotation={rot}
            textureUrl={"/img/mosaic.jpg"}
          />
          );
        }
        return (
          <Shape
            key={i}
            fillColor='#003399'
            rotation={rot}
            opacity={80}
          />
        )
    });
  };

  return (
    <>
      <Shape
        url="/svg/hexagon.svg"
        textureUrl={"/img/dark-stone.jpg"}
        position={[-950, -950, -50]}
        scale={10}
      />
      {renderCircle()}
    </>
  );
};
