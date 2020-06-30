import React, { useEffect, useState } from "react";
import Star from "../Star";
import {clearScene, initScene} from "../../scene";
import { createLayerControls } from "../../scene/gui";

const SceneEditor = ({ pattern }) => {
  useEffect(() => {
    return () => {
      clearScene();
    };
  }, []);

  const [layers, setLayers] = useState(null);

  const updateLayer = (id, prop, val) => {
    console.log(`updateLayer:`, id, prop, val);
    setLayers((layerState) => layerState.setIn([id, prop], val));
  };

  useEffect(() => {
    console.log('pattern update', pattern);
    const { layers } = pattern;
    clearScene();
    createLayerControls(layers.toList().toJS(), updateLayer);
    setLayers(layers);
  }, [pattern]);

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

  if (!layers) {
    return null;
  }
  return <>{layers.toList().map(renderLayer)}</>;
};

export default SceneEditor;
