import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import PATTERNS from "./patterns";
import FiberCanvas from "./components/FiberCanvas";
import "./App.css";
import Pattern from "./components/PatternManager";
import SceneControls from "./components/SceneControls";

function App() {
  const [animating, setAnimating] = useState(false);
  const [patternIndex, setPatternIndex] = useState(0);
  const [intensity, setIntensity] = useState(1);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.metaKey) {
        return;
      }

      if (e.keyCode === 32) {
        setAnimating(!animating);
      } else if (e.key === "ArrowLeft") {
        let i = (patternIndex - 1) % PATTERNS.length;
        if (i < 0) {
          i = PATTERNS.length - 1;
        }
        setPatternIndex(i);
      } else if (e.key === "ArrowRight") {
        setPatternIndex((patternIndex + 1) % PATTERNS.length);
      } else {
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  const pattern = PATTERNS[patternIndex];

  return (
    <main className="App">
      <SceneControls
        patternIndex={patternIndex}
        setPatternIndex={setPatternIndex}
        intensity={intensity}
        setIntensity={setIntensity}
      />
      <Canvas
        camera={{ fov: 90, position: [0, 0, 500], near: 1, far: 10000 }}
        onCreated={(scene) => {
          window.__scene = scene;
          scene.camera.lookAt(0, 0, 0);
        }}
      >
        <FiberCanvas animating={animating} intensity={intensity}>
          <Pattern key={pattern.name} pattern={pattern} />
        </FiberCanvas>
      </Canvas>
    </main>
  );
}

export default App;
