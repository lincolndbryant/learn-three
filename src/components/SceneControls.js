import PATTERNS from "../patterns";
import React, { useState } from "react";
import cx from "classnames";
import { Button, Message, Field, Label } from "rbx";
import Slider, { createSliderWithTooltip } from "rc-slider";
import Select from "react-select";
import svgFiles from "../svg";
import ColorButton from "./ColorButton";

const SliderWithTooltip = createSliderWithTooltip(Slider);

const LAYER_CONTROLS = [
  { name: "numPoints", type: "number", min: 1, max: 16, step: 1 },
  { name: "scale", type: "number", min: 0.1, max: 5, step: 0.05 },
  { name: "radius", type: "number", min: 0, max: 1000, step: 20 },
  { name: "zPosition", type: "number", min: 0, max: 1000, step: 20 },
  { name: "depth", type: "number", min: 0, max: 199, step: 5 },
  { name: "strokeWidth", type: "number", min: 0, max: 30 },
  { name: "opacity", type: "number", min: 0.1, max: 1, step: 0.05 },
];

const TEXTURE_URLS = [
  "/img/mosaic.jpg",
  "/img/concrete.jpg",
  "/img/dark-stone.jpg",
];

const TEXTURE_OPTIONS = [{ label: "None", value: null }].concat(
  TEXTURE_URLS.map((url) => ({
    label: url,
    value: process.env.PUBLIC_URL + url,
  }))
);

const SVG_OPTIONS = Object.keys(svgFiles).map((fileName) => {
  const url = svgFiles[fileName];
  return { label: fileName, value: url };
});

const PATTERN_OPTIONS = PATTERNS.map((pattern, i) => ({
  label: pattern.name,
  value: i,
}));

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: 200,
  }),
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const FieldWrapper = ({ labelText, children }) => {
  return (
    <Field horizontal expanded>
      <Field.Label size="small" className="is-normal">
        <Label className="has-text-light">{labelText}</Label>
      </Field.Label>
      <Field.Body>{children}</Field.Body>
    </Field>
  );
};

const LayerControls = ({ layer, updatePattern, onHide }) => {
  const [hidden, setHidden] = useState(false);

  const renderNumberField = (prop, i) => {
    return (
      <FieldWrapper key={i} labelText={prop.name}>
        <SliderWithTooltip
          {...prop}
          type="range"
          size="small"
          menuPlacement="auto"
          menuPosition="fixed"
          value={layer[prop.name] || 1}
          onChange={(value) => {
            updatePattern(layer.id, prop.name, value);
          }}
        />
      </FieldWrapper>
    );
  };

  const renderTextureUrlField = (propName) => {
    const value = layer[propName]
      ? TEXTURE_OPTIONS.find((o) => o.value === layer[propName])
      : TEXTURE_OPTIONS[0];

    return (
      <Field horizontal expanded>
        <Field.Label size="small" className="is-normal">
          <Label className="has-text-light">{propName}</Label>
        </Field.Label>
        <Field.Body style={{ width: "300px" }}>
          <Select
            options={TEXTURE_OPTIONS}
            value={value}
            onChange={(option) => {
              updatePattern(layer.id, propName, option.value);
            }}
            styles={customStyles}
          />
        </Field.Body>
      </Field>
    );
  };

  const renderSvgUrlField = (propName) => {
    const value = layer[propName]
      ? SVG_OPTIONS.find((o) => o.value === layer[propName])
      : SVG_OPTIONS[0];

    return (
      <Field horizontal expanded>
        <Field.Label size="small" className="is-normal">
          <Label className="has-text-light">{propName}</Label>
        </Field.Label>
        <Field.Body style={{ width: "300px" }}>
          <Select
            options={SVG_OPTIONS}
            value={value}
            onChange={(option) => {
              updatePattern(layer.id, propName, option.value);
            }}
            styles={customStyles}
          />
        </Field.Body>
      </Field>
    );
  };

  return (
    <Message className="layer-controls is-small">
      <div className="message-header">
        <p>Layer {layer.id}</p>
        <Button size="small" onClick={() => setHidden(!hidden)}>
          {hidden ? "Show" : "Hide"}
        </Button>
      </div>
      {!hidden && (
        <div className="message-body">
          {LAYER_CONTROLS.map((prop, i) => renderNumberField(prop, i))}

          <FieldWrapper labelText="fillColor">
            <ColorButton
              value={layer.fillColor}
              onChange={(color) => {
                updatePattern(layer.id, "fillColor", color.hex);
              }}
            />
          </FieldWrapper>

          {renderSvgUrlField("url")}
          {renderTextureUrlField("textureUrl")}
        </div>
      )}
    </Message>
  );
};

export default ({
  pattern,
  patternIndex,
  setPatternIndex,
  controlsVisible,
  setControlsVisible,
  intensity,
  setIntensity,
  updatePattern,
}) => {
  const renderLayer = (layer, i) => {
    return (
      <LayerControls
        key={layer.id}
        layer={layer}
        updatePattern={updatePattern}
      />
    );
  };

  const patternValue = PATTERN_OPTIONS[patternIndex];

  const renderControls = () => {
    return (
      <section className="section">
        <Message className="global-controls" size="small">
          <Message.Body>
            <FieldWrapper labelText="Pattern">
              <Select
                options={PATTERN_OPTIONS}
                value={patternValue}
                onChange={(opt) => setPatternIndex(opt.value)}
                styles={customStyles}
              />
            </FieldWrapper>
            <FieldWrapper labelText="Point light intensity">
              <Slider
                min={0.1}
                max={5}
                step={0.05}
                value={intensity}
                onChange={(val) => setIntensity(val)}
              />
            </FieldWrapper>
          </Message.Body>
        </Message>
        {pattern && pattern.layers.toList().toJS().map(renderLayer)}
      </section>
    );
  };

  return (
    <div
      className={cx("scene-controls is-dark has-text-light", {
        visible: controlsVisible,
      })}
    >
      <Button size="small" onClick={() => setControlsVisible(!controlsVisible)}>
        {controlsVisible ? "Hide" : "Show"}
      </Button>
      {controlsVisible && renderControls()}
    </div>
  );
};
