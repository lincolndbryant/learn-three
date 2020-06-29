import { Map, OrderedMap } from "immutable";
import * as COLORS from "../constants/colors";
import DEFAULT_PATTERN from "../patterns/01.json";

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

export const DEFAULT_LAYERS = createLayers(DEFAULT_PATTERN.layers);
