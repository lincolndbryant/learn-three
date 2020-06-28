import React, { useEffect, useState } from "react";
import Star from "../Star";
import { clearScene } from "../../scene";
import { DEFAULT_LAYERS } from "../../lib/layer";
import {createLayerControls} from "../../scene/gui";

const SceneEditor = () => {
  const [layers, setLayers] = useState(DEFAULT_LAYERS);

  const updateLayer = (id, prop, val) => {
    console.log(`updateLayer:`, id, prop, val);
    setLayers(layerState => layerState.setIn([id, prop], val));
  };

  useEffect(() => {
    createLayerControls(layers.toList().toJS(), updateLayer);

    return () => {
      clearScene();
    };
  }, []);

  const renderLayer = (layer, i) => {
    const layerData = layer.toJS();
    const { numPoints, radius, zPosition, ...rest } = layerData;
    return (
      <Star
        key={i}
        numPoints={numPoints}
        radius={radius}
        zPosition={zPosition}
        layer={rest}
      />
    );
  };

  return <>{layers.toList().map(renderLayer)}</>;
};

export default SceneEditor;
