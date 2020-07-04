import PATTERNS from "../patterns";
import React from "react";
import { Button, Control, Dropdown, Field, Input, Label } from "rbx";

export default ({ patternIndex, setPatternIndex, intensity, setIntensity }) => {
  const pattern = PATTERNS[patternIndex];
  return (
    <div className="controls">
      <Field>
        <Label>Pattern</Label>
        <Control>
          <Dropdown onChange={(e) => setPatternIndex(e.target.value)}>
            <Dropdown.Trigger>
              <Button>{pattern.name}</Button>
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
          <Input
            type="number"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
          />
        </Control>
      </Field>
    </div>
  );
};
