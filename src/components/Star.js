import PropTypes from "prop-types";
import React from "react";
import { MathUtils } from "three";
import { range } from "../lib/utils";
import Shape from "./Shape";

const Star = ({ layer, patternId, numPoints, zPosition, radius, PointComponent }) => {
  const stepSize = 360 / numPoints;

  return range(0, 360, stepSize).map((rot, i) => {
    const rad = MathUtils.degToRad(rot);

    return (
      <PointComponent
        key={i}
        rotation={-rot}
        position={[Math.sin(rad) * radius, Math.cos(rad) * radius, zPosition]}
        patternId={patternId}
        layerId={layer.id}
        {...layer}
      />
    );
  });
};

Star.propTypes = {
  numPoints: PropTypes.number.isRequired,
  rotations: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  zPosition: PropTypes.number.isRequired,
  url: PropTypes.string,
  textureUrl: PropTypes.string,
  fillColor: PropTypes.string,
  PointComponent: PropTypes.elementType.isRequired,
};

Star.defaultProps = {
  numPoints: 6,
  rotations: 1,
  radius: 0,
  zPosition: 0,
  PointComponent: Shape,
};

export default Star;
