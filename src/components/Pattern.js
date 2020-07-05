import React from "react";
import FiberStar from "./FiberStar";

const Pattern = ({ pattern }) => {
  const layerData = pattern.layers.toList().toJS();
  return layerData.map((layer, i) => {
    return <FiberStar key={i} {...layer} />;
  });
};

export default Pattern;
