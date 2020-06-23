import { Component } from "react";
import PropTypes from "prop-types";
import { loadSVG } from "../lib/utils";

export default class Shape extends Component {
  static propTypes = {
    url: PropTypes.string,
    fillColor: PropTypes.string,
    position: PropTypes.array,
    rotation: PropTypes.number,
    drawStrokes: PropTypes.bool,
  };

  static defaultProps = {
    position: [0, 0, 0],
    rotation: 0,
    drawStrokes: false,
    drawStrokes2: false,
    extrude: true,
  };

  componentDidMount() {
    const { url } = this.props;
    loadSVG(url, this.props).then((g) => {
      this.g = g;
    });
  }

  componentWillUnmount() {
    window.scene.remove(this.g);
  }

  render() {
    return null;
  }
}
