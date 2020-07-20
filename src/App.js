import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import { Loop, Transport } from "tone";
import PATTERNS from "./patterns";
import FiberCanvas from "./components/FiberCanvas";
import Pattern from "./components/Pattern";
import SceneControls from "./components/SceneControls";
import useQueryString from "./hooks/useQueryString";
import "./App.css";
import SVGShape from "./components/SVGShape";
import svgFiles from "./svg";
import { SLATE, TEAL } from "./constants/colors";
import CenterCone from "./components/CenterCone";
import Timer from "./components/Timer";

function App() {
  const [animating, setAnimating] = useState(false);
  const [ticks, setTicks] = useState(null);
  const [intensity, setIntensity] = useState(0.01);
  const [patternIndex, setPatternIndex] = useQueryString("i", 0);
  const [pattern, setPattern] = useState(PATTERNS[patternIndex]);
  const [controlsVisible, setControlsVisible] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      console.log(e);
      if (e.metaKey) {
        return;
      }

      if (e.keyCode === 32) {
        if (animating) {
          Transport.pause();
        } else {
          Transport.start();
          console.log("start animating");
        }
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
      }
    };

    window.addEventListener("keydown", onKeyDown);
    console.log("setup key listeners");

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [animating, patternIndex, setPatternIndex]);

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
        controlsVisible={controlsVisible}
        setControlsVisible={setControlsVisible}
        intensity={intensity}
        setIntensity={setIntensity}
        updatePattern={updatePatternLayer}
      />
      <Timer setTicks={setTicks} />
      <Canvas
        camera={{
          fov: 90,
          position: [0, 0, 500],
          near: 100,
          far: 10000,
          up: [0, 0, 100],
        }}
        onCreated={(scene) => {
          window.__scene = scene;
          scene.camera.lookAt(0, 0, 0);
        }}
      >
        <FiberCanvas animating={animating} intensity={intensity}>
          <Pattern key={pattern.name} pattern={pattern} ticks={ticks} />
          <CenterCone />
          <Suspense fallback={null}>
            <SVGShape
              url={svgFiles["hexagon.svg"]}
              fillColor={SLATE}
              textureUrl={"concrete.jpg"}
              rotation={0}
              scale={[10, 10, 5]}
              position={[0, 0, -100]}
              depth={10}
            />
          </Suspense>
        </FiberCanvas>
      </Canvas>
    </main>
  );
}

export default App;
