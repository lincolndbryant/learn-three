import React, {Suspense, useEffect, useState} from "react";
import { Canvas } from "react-three-fiber";
import { animated } from 'react-spring';
import {useSpring, a} from 'react-spring/three'
import PATTERNS from "./patterns";
import FiberCanvas from "./components/FiberCanvas";
import Pattern from "./components/Pattern";
import SceneControls from "./components/SceneControls";
import useQueryString from "./hooks/useQueryString";
import "./App.css";
import SVGShape from "./components/SVGShape";
import svgFiles from "./svg";
import {SLATE, TEAL} from "./constants/colors";

function App() {
  const [animating, setAnimating] = useState(false);
  const [intensity, setIntensity] = useState(1);
  const [patternIndex, setPatternIndex] = useQueryString("i", 0);
  const [pattern, setPattern] = useState(PATTERNS[patternIndex]);
  const [controlsVisible, setControlsVisible] = useState(false);
  const props = useSpring({
    // loop: true,
    to: {number: 4, scale: 5, zPos: 500},
    from: {number: 1, scale: 1, zPos: 0},
    config: { duration: 3500 },
    reset: true,
  });

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
      <div style={{padding: 20}}>
        <animated.div style={props}>{props.number.interpolate(v => {
          return Math.floor(v);
        })}
        </animated.div>
      </div>
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

          <a.mesh name="cone" rotation={[Math.PI / 2, 0, 0]} position-z={props.zPos} scale-x={props.scale} scale-y={props.scale} scale-z={props.scale} castShadow>
            <coneGeometry attach="geometry" args={[200, 200, 32]} />
            <meshStandardMaterial attach="material" color={TEAL} />
          </a.mesh>

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
