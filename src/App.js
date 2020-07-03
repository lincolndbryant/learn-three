import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import PATTERNS from "./patterns";
import FiberCanvas from "./components/FiberCanvas";
import "./App.css";
import Pattern from "./components/PatternManager";

function App() {
  const [animating, setAnimating] = useState(false);
  const [patternIndex, setPatternIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.metaKey) {
        return;
      }

      if (e.keyCode === 32) {
        setAnimating(!animating);
      } else if (e.key === "ArrowLeft") {
        setPatternIndex((patternIndex - 1) % PATTERNS.length);
      } else if (e.key === "ArrowRight") {
        setPatternIndex((patternIndex + 1) % PATTERNS.length);
      } else {
        return;
      }
      e.preventDefault();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  const pattern = PATTERNS[patternIndex] || PATTERNS[0];
  return (
    <div className="App">
      <div className="controls">
        <select
          value={patternIndex}
          onChange={(e) => setPatternIndex(e.target.value)}
        >
          {PATTERNS.map((pattern, i) => (
            <option key={i} value={i}>
              {pattern.name}
            </option>
          ))}
        </select>
      </div>
      <Canvas
        camera={{ fov: 90, position: [0, 0, 500], near: 1, far: 10000 }}
        onCreated={(scene) => {
          window._scene = scene;
          scene.camera.lookAt(0, 0, 0);
        }}
      >
        <FiberCanvas animating={animating}>
          <Pattern pattern={pattern} />
        </FiberCanvas>
      </Canvas>
    </div>
  );
}

export default App;
