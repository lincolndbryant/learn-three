import { Map, OrderedMap } from "immutable";
import * as COLORS from "../constants/colors";
import svgFiles from "../svg";

const LAYER_Z_OFFSET = 10;

export const createLayers = (layers) => {
  return OrderedMap(
    layers.map((layer, i) => {
      if (!layer.id) {
        layer.id = i + 1;
      }
      if (COLORS[layer.fillColor]) {
        layer.fillColor = COLORS[layer.fillColor];
      }
      if (COLORS[layer.strokeColor]) {
        layer.strokeColor = COLORS[layer.strokeColor];
      }
      if (layer.highlight) {
        if (COLORS[layer.highlight.fillColor]) {
          layer.highlight.fillColor = COLORS[layer.highlight.fillColor];
        }
        if (COLORS[layer.highlight.strokeColor]) {
          layer.highlight.strokeColor = COLORS[layer.highlight.strokeColor];
        }
      }
      const fileName = layer.url.split("/").pop();
      if (svgFiles[fileName]) {
        layer.url = svgFiles[fileName];
      }
      if (layer.textureUrl) {
        layer.textureUrl = process.env.PUBLIC_URL + layer.textureUrl;
      }
      if (!layer.zPosition) {
        layer.zPosition = i * LAYER_Z_OFFSET;
      }
      return [layer.id, Map(layer)];
    })
  );
};
