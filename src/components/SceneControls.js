import PATTERNS from "../patterns";
import React from "react";
import { Button, Control, Dropdown, Field, Input, Label, Panel} from "rbx";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import ColorButton from "./ColorButton";

const LAYER_CONTROLS = [
  {name: 'opacity', type: 'number', min: 0.1, max: 1, step: 0.05},
  {name: 'strokeWidth', type: 'number', min: 0, max: 30},
]

const LayerControls = ({layer, updatePattern}) => {
  return (
    <Panel>
      <Panel.Heading size="small">Layer {layer.id}</Panel.Heading>
        {LAYER_CONTROLS.map((prop, i) =>
          <Panel.Block key={i}>
            <Label size="small">{ prop.name }</Label>
              <Slider
                {...prop}
                type="range"
                size="small"
                value={layer[prop.name] || 1}
                onChange={value => {
                  updatePattern(layer.id, prop.name, value)
                }}
              />
          </Panel.Block>
        )}
      <Panel.Block>
        <Label>fillColor</Label>
        <ColorButton value={layer.fillColor} onChange={color => {
          updatePattern(layer.id, 'fillColor', color.hex)
        }} />
      </Panel.Block>
    </Panel>
  )
}

export default ({ pattern, patternIndex, setPatternIndex, intensity, setIntensity, updatePattern }) => {
  const renderLayer = (layer, i) => <LayerControls key={i} layer={layer} updatePattern={updatePattern} />


  return (
    <Panel className="controls is-primary">
      <Field>
        <Label>Pattern</Label>
        <Control>
          <Dropdown onChange={(e) => setPatternIndex(e.target.value)} width={"100%"}>
            <Dropdown.Trigger>
              <Button width={"100%"} textAlign={"left"}>{pattern.name}</Button>
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
      </Field>
      <Field>
        <Label>Point light intensity</Label>
        <Control>
          <Slider
            min={0.1}
            max={5}
            step={0.05}
            value={intensity}
            onChange={val => setIntensity(val)}
          />
        </Control>
      </Field>
      {pattern && pattern.layers.toList().toJS().map(renderLayer)}
    </Panel>
  );
};
