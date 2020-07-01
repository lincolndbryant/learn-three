import {createLayers} from "../lib/layer";
import blueTiles from "./01.json";
import pattern2 from "./02.json";

const createPattern = data => ({...data, layers: createLayers(data.layers)})

export default [
  {name: 'pattern2', ...createPattern(pattern2)},
  {name: 'blueTiles', ...createPattern(blueTiles)},

]
