import { Component } from "react";
import PropTypes from "prop-types";
import { loadSVG } from "../utils";

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
