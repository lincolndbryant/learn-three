import React, { Component } from "react";
import { animate, initScene } from "../scene";
import Scene1 from "./Scene1";

export default class Canvas extends Component {
  componentDidMount() {
    initScene();
    animate();
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
