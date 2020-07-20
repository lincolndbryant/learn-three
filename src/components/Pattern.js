import React from "react";
import FiberStar from "./FiberStar";

const Pattern = ({ pattern, ticks }) => {
  const layerData = pattern.layers.toList().toJS();
  return layerData.map((layer, i) => {
    return <FiberStar key={i} {...layer} ticks={ticks} />;
  });
};

export default Pattern;
