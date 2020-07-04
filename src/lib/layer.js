import { Map, OrderedMap } from "immutable";
import * as COLORS from "../constants/colors";

export const createLayers = (layers) => {
  return OrderedMap(
    layers.map((layer, i) => {
      if (!layer.id) {
        layer.id = i + 1;
      }
      if (COLORS[layer.fillColor]) {
        layer.fillColor = COLORS[layer.fillColor];
      }
      return [i + 1, Map(layer)];
    })
  );
};
