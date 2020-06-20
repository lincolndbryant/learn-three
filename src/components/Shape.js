import { Component } from "react";
import PropTypes from "prop-types";
import { MathUtils } from "three";
import { loadSVG } from "../scene";

export default class Shape extends Component {
  static propTypes = {
    url: PropTypes.string,
    fillColor: PropTypes.string,
    position: PropTypes.array,
    rotation: PropTypes.number,
  };

  static defaultProps = {
    position: [0, 0, 0],
    rotation: 0,
  };

  componentDidMount() {
    const { url, position, rotation, scale } = this.props;
    loadSVG(url, this.props).then((g) => {
      this.g = g;
      g.rotateZ(MathUtils.degToRad(rotation));
      if (scale) {
        g.scale.set(scale, scale, scale);
      }
      g.position.set(position[0], position[1], position[2]);
    });
  }

  render() {
    return null;
  }
}
