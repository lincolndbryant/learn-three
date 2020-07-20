import { Loop, Transport } from "tone";
import { useEffect, useRef } from "react";

Transport.bpm.value = 90;
window._transport = Transport;

export default function Timer({ setTicks }) {
  const ticks = useRef(0);
  useEffect(() => {
    console.log("init loop");
    new Loop((ts) => {
      ticks.current++;
      ticks.current = ticks.current % 16;
      setTicks(ticks.current);
    }, "4n").start(0);
  }, [setTicks]);

  return null;
}
