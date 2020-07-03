import { createLayers } from "../lib/layer";
import blueTiles from "./01.json";
import pattern2 from "./02.json";
import feathers from "./03.json";

const createPattern = (data) => ({
  ...data,
  layers: createLayers(data.layers),
});

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
