import { Loop, Transport } from "tone";
import { useEffect, useRef } from "react";

let toneStarted = false;

export default function Timer({ setTicks, animating }) {
  const ticks = useRef(0);

  useEffect(() => {
    if (!toneStarted && animating) {
      Transport.bpm.value = 90;

      new Loop(() => {
        ticks.current++;
        ticks.current = ticks.current % 16;
        setTicks(ticks.current);
      }, "4n");

      toneStarted = true;
    }
  }, [animating]);

  return null;
}
