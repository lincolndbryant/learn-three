import React, { Component } from "react";
import PropTypes from "prop-types";
import { initScene, renderScene, setAnimating } from "../scene";
import Scene1 from "./Scene1";

export default class Canvas extends Component {
  static propTypes = {
    animating: PropTypes.bool,
  };

  componentDidMount() {
    initScene();
    renderScene();
  }

  componentDidUpdate(prevProps) {
    if (this.props.animating !== prevProps.animating) {
      setAnimating(this.props.animating);
    }
  }

  render() {
    return (
      <main>
        <div id="container" />
        <Scene1 />
      </main>
    );
  }
}
