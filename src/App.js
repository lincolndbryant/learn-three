import React, { useEffect, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import PATTERNS from "./patterns";

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

  return (
    <div className="App">
      <div className="controls">
        <select value={patternIndex} onChange={e => setPatternIndex(e.target.value)}>
          {PATTERNS.map((pattern, i) => <option key={i} value={i}>{pattern.name}</option>)}
        </select>
      </div>
      <Canvas
        animating={animating}
        pattern={PATTERNS[patternIndex] || PATTERNS[0]}
      />
    </div>
  );
}

export default App;
