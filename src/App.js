import React, { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import SCENES from "./components/scenes";

function App() {
  const [animating, setAnimating] = useState(false);
  const [sceneIndex, setSceenIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e) => {
      e.preventDefault();
      if (e.keyCode === 32) {
        setAnimating(!animating);
      } else if (e.key === "ArrowLeft") {
        setSceenIndex((sceneIndex - 1) % SCENES.length);
      } else if (e.key === "ArrowRight") {
        setSceenIndex((sceneIndex + 1) % SCENES.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="App">
      <Canvas
        animating={animating}
        SceneComponent={SCENES[sceneIndex] || SCENES[0]}
      />
    </div>
  );
}

export default App;
