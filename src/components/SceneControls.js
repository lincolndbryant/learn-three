import PATTERNS from "../patterns";
import React from "react";
import { Button, Control, Dropdown, Field, Label } from "rbx";
import Slider from "rc-slider";
import Select from "react-select";
import "rc-slider/assets/index.css";
import ColorButton from "./ColorButton";

const LAYER_CONTROLS = [
  { name: "opacity", type: "number", min: 0.1, max: 1, step: 0.05 },
  { name: "strokeWidth", type: "number", min: 0, max: 30 },
];

const TEXTURE_URLS = [
  "/img/mosaic.jpg",
  "/img/concrete.jpg",
  "/img/dark-stone.jpg",
];
const TEXTURE_OPTIONS = [{ label: "None", value: null }].concat(
  TEXTURE_URLS.map((url) => ({ label: url, value: url }))
);

const LayerControls = ({ layer, updatePattern }) => {
  const renderNumberField = (prop, i) => {
    return (
      <Field key={i} horizontal expanded>
        <Field.Label size="small" className="is-normal">
          <Label className="has-text-light">{prop.name}</Label>
        </Field.Label>
        <Field.Body>
          <Slider
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
        </Field.Body>
      </Field>
    );
  };

  const renderTextureUrlField = (propName) => {
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

  return (
    <section className="layer-controls">
      <h3 size="small">Layer {layer.id}</h3>
      {LAYER_CONTROLS.map((prop, i) => renderNumberField(prop, i))}

      <Field horizontal expanded>
        <Field.Label size="small">
          <Label className="has-text-light">fillColor</Label>
        </Field.Label>
        <Field.Body>
          <ColorButton
            value={layer.fillColor}
            onChange={(color) => {
              updatePattern(layer.id, "fillColor", color.hex);
            }}
          />
        </Field.Body>
      </Field>

      {renderTextureUrlField("textureUrl")}
    </section>
  );
};

export default ({
  pattern,
  patternIndex,
  setPatternIndex,
  intensity,
  setIntensity,
  updatePattern,
}) => {
  const renderLayer = (layer, i) => (
    <LayerControls key={i} layer={layer} updatePattern={updatePattern} />
  );

  return (
    <section className="section scene-controls is-dark has-text-light">
      <div className="global-controls">
        <Field horizontal>
          <Field.Label size="normal">
            <Label className="has-text-light">Pattern</Label>
          </Field.Label>
          <Field.Body>
            <Control>
              <Dropdown
                onChange={(e) => setPatternIndex(e.target.value)}
                width={"100%"}
              >
                <Dropdown.Trigger>
                  <Button width={"100%"} textAlign={"left"}>
                    {pattern.name}
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu>
                  <Dropdown.Content>
                    {PATTERNS.map((pattern, i) => (
                      <Dropdown.Item
                        key={i}
                        value={i}
                        active={patternIndex === i}
                        onClick={() => setPatternIndex(i)}
                      >
                        {pattern.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Content>
                </Dropdown.Menu>
              </Dropdown>
            </Control>
          </Field.Body>
        </Field>
        <div className="field is-horizontal">
          <div className="field-label">
            <Label className="has-text-light">Point light intensity</Label>
          </div>
          <div className="field-body">
            <Slider
              min={0.1}
              max={5}
              step={0.05}
              value={intensity}
              onChange={(val) => setIntensity(val)}
            />
          </div>
        </div>
      </div>
      {pattern && pattern.layers.toList().toJS().map(renderLayer)}
    </section>
  );
};
