import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Star from "../Star";
import { NEW_ENGLAND } from "../../constants/colors";
import { clearScene, initGui } from "../../scene";

const SceneEditor = ({ layers }) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const updateLayer = (i, prop, val) => {
    layers[i][prop] = val;
    setLayers(layers);
    clearScene();
    forceUpdate();
  };

  const [layerState, setLayers] = useState(layers);

  useEffect(() => {
    initGui(layers, updateLayer);

    return () => {
      clearScene();
    };
  }, []);

  const renderLayer = (layerProps, i) => {
    return <Star key={i} {...layerProps} />;
  };

  return <>{layerState.map(renderLayer)}</>;
};

SceneEditor.propTypes = {
  layers: PropTypes.array.isRequired,
};

SceneEditor.defaultProps = {
  layers: [
    {
      url: "/svg/drop-01.svg",
      fillColor: NEW_ENGLAND,
      radius: 100,
      numPoints: 6,
    },
  ],
};

export default SceneEditor;
