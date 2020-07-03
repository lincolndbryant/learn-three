import React from "react";
import ReactDOM from "react-dom";
import {Canvas} from 'react-three-fiber'
import FiberCanvas from "./components/FiberCanvas";
import "./index.css";
import "./App.css";

ReactDOM.render(
  <Canvas camera={{fov: 90, position: [0, 0, 500], near: 1, far: 10000}}
          onCreated={(scene) => {
            window._scene = scene;
            scene.camera.lookAt(0, 0, 0)
          }}>
    <FiberCanvas/>
  </Canvas>,
  document.getElementById("root")
);
