import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { List } from "immutable";
import Star from "../Star";
import { clearScene, initGui } from "../../scene";
import { DEFAULT_LAYERS } from "../../lib/layer";

const SceneEditor = ({ layers }) => {
  const [layerState, setLayers] = useState(layers);

  const updateLayer = (id, prop, val) => {
    console.log(`updateLayer:`, id, prop, val);
    setLayers(layers.setIn([id, prop], val));
  };

  useEffect(() => {
    initGui(layers, updateLayer);

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

  return <>{layerState.map(renderLayer)}</>;
};

SceneEditor.propTypes = {
  layers: PropTypes.instanceOf(List).isRequired,
};

SceneEditor.defaultProps = {
  layers: DEFAULT_LAYERS,
};

export default SceneEditor;
