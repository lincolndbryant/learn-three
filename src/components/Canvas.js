import React, { Component } from "react";
import PropTypes from "prop-types";
import { initScene, renderScene, setAnimating } from "../scene";

export default class Canvas extends Component {
  static propTypes = {
    animating: PropTypes.bool,
    SceneComponent: PropTypes.elementType.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      scene: null,
    };
  }

  componentDidMount() {
    window.scene = initScene();
    this.setState({ scene: window.scene });
    renderScene();
  }

  componentDidUpdate(prevProps) {
    if (this.props.animating !== prevProps.animating) {
      setAnimating(this.props.animating);
    }
  }

  render() {
    const { SceneComponent } = this.props;
    return (
      <main>
        <div id="container" />
        {this.state.scene && <SceneComponent />}
      </main>
    );
  }
}
