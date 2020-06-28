import { Map, OrderedMap } from "immutable";
import { NEW_ENGLAND, TEAL } from "../constants/colors";

const DEFAULT_LAYER_DATA = [
  {
    url: "/svg/drop-01.svg",
    fillColor: NEW_ENGLAND,
    radius: 100,
    numPoints: 6,
  },
  {
    url: "/svg/drop-narrow.svg",
    fillColor: TEAL,
    radius: 50,
    numPoints: 4,
    zPosition: 10,
  },
];

export const createLayers = (layers) => {
  return OrderedMap(
    layers.map((layer, i) => {
      if (!layer.id) {
        layer.id = i + 1;
      }
      return [i + 1, Map(layer)];
    })
  );
};

export const DEFAULT_LAYERS = createLayers(DEFAULT_LAYER_DATA);
