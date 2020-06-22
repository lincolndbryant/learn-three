import React, { Component } from "react";
import PropTypes from "prop-types";
import { initScene, renderScene, setAnimating } from "../scene";
import Shape from "./Shape";

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

  renderScene() {
    const { SceneComponent } = this.props;
    return (
      <>
        <Shape
          url="/svg/hexagon.svg"
          textureUrl={"/img/dark-stone.jpg"}
          name="hexagon"
          position={[0, 0, -50]}
          scale={10}
          zPosition={-50}
          depth={2}
        />
        <SceneComponent />
      </>
    );
  }

  render() {
    return (
      <main>
        <div id="container" />
        {this.state.scene && this.renderScene()}
      </main>
    );
  }
}
