import PropTypes from "prop-types";
import React from "react";
import { MathUtils } from "three";
import { range } from "../utils";

const Star = ({ numPoints, zPosition, radius, PointComponent, ...rest }) => {
  const stepSize = 360 / numPoints;
  return range(0, 360, stepSize).map((rot, i) => {
    const rad = MathUtils.degToRad(rot);

    return (
      <PointComponent
        key={i}
        rotation={-rot}
        position={[Math.sin(rad) * radius, Math.cos(rad) * radius, zPosition]}
        {...rest}
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
  numPoints: 12,
  rotations: 1,
  radius: 0,
  zPosition: 0,
};

export default Star;
