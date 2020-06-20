import React, { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";

function App() {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      console.log(e);
      if (e.keyCode === 32) {
        setAnimating(!animating);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="App">
      <Canvas animating={animating} />
    </div>
  );
}

export default App;
