import { Component } from "react";
import PropTypes from "prop-types";
import { loadSVG } from "../lib/utils";

export default class Shape extends Component {
  static propTypes = {
    layerId: PropTypes.number,
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
    const { url, layerId } = this.props;
    console.log('drawing shape', this.props);
    loadSVG(url, this.props).then((g) => {
      g.userData.layerId = layerId;
      this.g = g;
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fillColor !== this.props.fillColor) {
      this.g.children[0].material.color.set(this.props.fillColor);
    }
  }

  componentWillUnmount() {
    console.log('removing shape', this.g);
    if (this.g) {
      window.scene.remove(this.g.children[0]);
      window.scene.remove(this.g);
    }
  }

  render() {
    return null;
  }
}
