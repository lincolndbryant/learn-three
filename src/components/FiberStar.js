import PropTypes from "prop-types";
import React, {Suspense} from "react";
import { MathUtils } from "three";
import { range } from "../lib/utils";
import SVGShape from "./SVGShape";

const FiberStar = ({ numPoints, radius, zPosition, PointComponent, ...rest }) => {
  const stepSize = 360 / numPoints;
  return range(0, 360, stepSize).map((rot, i) => {
    const rad = MathUtils.degToRad(rot);
    if (typeof rest.scale === 'number') {
      rest.scale = [rest.scale, rest.scale, rest.scale];
    }

    return (
      <Suspense fallback={null} key={i}>
        <PointComponent
          key={i}
          rotation={-rad}
          position={[Math.sin(rad) * radius, Math.cos(rad) * radius, zPosition]}
          {...rest}
        />
      </Suspense>
    );
  });
};

FiberStar.propTypes = {
  numPoints: PropTypes.number.isRequired,
  rotations: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  zPosition: PropTypes.number.isRequired,
};

FiberStar.defaultProps = {
  numPoints: 6,
  rotations: 1,
  radius: 0,
  zPosition: 0,
  PointComponent: SVGShape,
};

export default FiberStar;
