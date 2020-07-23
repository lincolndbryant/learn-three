import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import "./app.sass";
import "rc-slider/assets/index.css";
import App from "./App";

window.TONE_SILENCE_LOGGING = true;

ReactDOM.render(<App />, document.getElementById("root"));
