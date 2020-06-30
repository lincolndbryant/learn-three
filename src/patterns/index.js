import {createLayers} from "../lib/layer";
import blueTiles from "./01.json";
import pattern2 from "./02.json";

const createPattern = data => ({...data, layers: createLayers(data.layers)})

export default [
  {name: 'blueTiles', ...createPattern(blueTiles)},
  {name: 'pattern2', ...createPattern(pattern2)},
]
