import React, { Component } from "react";
import PropTypes from "prop-types";
import { initScene, renderScene, setAnimating } from "../scene";
import Shape from "./Shape";
import SceneEditor from "./scenes/SceneEditor";

export default class Canvas extends Component {
  static propTypes = {
    animating: PropTypes.bool,
    pattern: PropTypes.object,
    SceneComponent: PropTypes.elementType.isRequired,
  };

  static defaultProps = {
    SceneComponent: SceneEditor,
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
    if (this.props.SceneComponent !== prevProps.SceneComponent) {
      console.log("Changing scene to:", this.props.SceneComponent);
    }
  }

  renderScene() {
    const { SceneComponent, pattern } = this.props;
    return (
      <>
        <Shape
          url="/svg/hexagon.svg"
          textureUrl={"/img/concrete.jpg"}
          fillColor={"#333333"}
          name="hexagon"
          position={[0, 0, -50]}
          scale={10}
          zPosition={-50}
          depth={2}
        />
        {SceneComponent && <SceneComponent pattern={pattern} />}
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
