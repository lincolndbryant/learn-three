import { createLayers } from "../lib/layer";

const importAll = (require) =>
  require.keys().reduce((acc, next) => {
    acc[next.replace("./", "")] = require(next);
    return acc;
  }, {});

const patternFiles = importAll(require.context("./", true, /\.(json)$/));

const PATTERNS = Object.keys(patternFiles).map((filename) => {
  const patternData = patternFiles[filename];
  return {
    name: patternData.name || filename,
    layers: createLayers(patternData.layers),
  };
});

export default PATTERNS;
