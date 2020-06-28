import { Map, OrderedMap } from "immutable";
import {MOONLIGHT, NEW_ENGLAND, SLATE, TEAL} from "../constants/colors";

const DEFAULT_LAYER_DATA = [
  {
    url: "/svg/drop-01.svg",
    fillColor: SLATE,
    radius: 50,
    numPoints: 8,
  },
  {
    url: "/svg/drop-01.svg",
    fillColor: NEW_ENGLAND,
    textureUrl: "/img/mosaic.jpg",
    radius: 50,
    numPoints: 8,
    scale:  0.95,
    zPosition: 5,
  },
  {
    url: "/svg/drop-narrow.svg",
    fillColor: TEAL,
    radius: 50,
    numPoints: 8,
    zPosition: 10,
    scale: 0.8,
  },
  {
    url: "/svg/claw.svg",
    fillColor: MOONLIGHT,
    radius: 50,
    numPoints: 4,
    zPosition: 20,
    scale: 0.6,
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
