import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import PATTERNS from "./patterns";
import FiberCanvas from "./components/FiberCanvas";
import Pattern from "./components/Pattern";
import SceneControls from "./components/SceneControls";
import useQueryString from "./hooks/useQueryString";
import "./App.css";

function App() {
  const [animating, setAnimating] = useState(false);
  const [intensity, setIntensity] = useState(1);
  const [patternIndex, setPatternIndex] = useQueryString("i", 0);
  const [pattern, setPattern] = useState(PATTERNS[patternIndex]);

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
        setPattern(PATTERNS[i]);
      } else if (e.key === "ArrowRight") {
        const i = (patternIndex + 1) % PATTERNS.length;
        setPatternIndex(i);
        setPattern(PATTERNS[i]);
      } else {
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  const updatePatternLayer = (i, key, val) => {
    setPattern((pattern) => ({
      ...pattern,
      layers: pattern.layers.setIn([i, key], val),
    }));
  };

  useEffect(() => {
    const newPattern = PATTERNS[patternIndex];
    setPattern(newPattern);
  }, [patternIndex]);

  return (
    <main className="App">
      <SceneControls
        pattern={pattern}
        patternIndex={patternIndex}
        setPatternIndex={setPatternIndex}
        intensity={intensity}
        setIntensity={setIntensity}
        updatePattern={updatePatternLayer}
      />
      <Canvas
        camera={{
          fov: 90,
          position: [0, 0, 500],
          near: 1,
          far: 10000,
          up: [0, 0, 100],
        }}
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
