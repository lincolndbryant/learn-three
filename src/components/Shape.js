import { Component } from "react";
import PropTypes from "prop-types";
import { loadSVG } from "../lib/utils";

export default class Shape extends Component {
  static propTypes = {
    layerId: PropTypes.number,
    patternId: PropTypes.string,
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
    this.drawShape();
  }

  componentDidUpdate(prevProps) {
    if (this.props.patternId !== prevProps.patternId) {
      console.log("pattern updated updated", this);
      this.removeShape();
      this.drawShape();
      return;
    }
    if (prevProps.fillColor !== this.props.fillColor) {
      this.removeShape();
      this.drawShape();
    }
  }

  componentWillUnmount() {
    this.removeShape();
  }

  drawShape() {
    const { url, layerId } = this.props;
    console.log("drawing shape", this.props);
    loadSVG(url, this.props).then((g) => {
      g.userData.layerId = layerId;
      this.g = g;
    });
  }

  removeShape() {
    if (this.g) {
      console.log("removing shape", this.g);
      window.scene.remove(this.g);
    } else {
    }
  }

  render() {
    return null;
  }
}
