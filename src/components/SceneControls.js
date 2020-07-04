import PATTERNS from "../patterns";
import React from "react";
import { Button, Dropdown } from "rbx";

export default ({ patternName, patternIndex, setPatternIndex }) => {
  const pattern = PATTERNS[patternIndex];
  return (
    <div className="controls">
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
    </div>
  );
};
