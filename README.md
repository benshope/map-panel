# Map Panel

[![gzip size](https://img.shields.io/bundlephobia/minzip/map-panel?label=gzip%20size&style=for-the-badge)](https://bundlephobia.com/result?p=map-panel)
[![npm version](https://img.shields.io/npm/v/map-panel.svg?style=for-the-badge)](https://www.npmjs.com/package/map-panel)
[![npm downloads](https://img.shields.io/npm/dm/map-panel.svg?style=for-the-badge)](https://www.npmjs.com/package/map-panel)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://en.wikipedia.org/wiki/MIT_License)

This is a React/Typescript component for adding a responsive, mobile-ready panel over a map. The implementation is just one file, it can be styled, and it has only peer dependencies.

## Install

- **Npm:** `npm install map-panel`
- **Yarn:** `yarn add map-panel`

## Basic Example

```jsx
import React from "react";
import MapPanel from "map-panel";

const MyComponent = () => (
  <div style={{ position: "relative", width: "100%", height: "70vh" }}>
    <MapPanel>
      <div style={{ flex: 1 }}>{`Panel Content`}</div>
    </MapPanel>
    <Map />
  </div>
);
```

## Scrolling & Controls Example

```jsx
import React from "react";
import MapPanel, { InnerScrollDiv } from "map-panel";

const MyComponent = () => {
  const breakpoint = 1024;
  const [panelY, setPanelY] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(null);
  return (
    <div style={{ position: "relative", width: "100%", height: "70vh" }}>
      <MapPanel
        breakpoint={breakpoint}
        onScroll={newPanelY => {
          setPanelY(newPanelY);
          newPanelY === 1 && setIsOpen(true);
          newPanelY === 0 && setIsOpen(false);
        }}
        isOpen={isOpen}
      >
        <InnerScrollDiv breakpoint={breakpoint} panelY={panelY}>
          <div style={{ height: "200vh" }}>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? "Close" : "Open"} Panel
            </button>
          </div>
        </InnerScrollDiv>
      </MapPanel>
      <Map />
    </div>
  );
};
```

See the [examples](https://benshope.github.io/map-panel) and the [examples source code](https://github.com/benshope/map-panel/blob/master/stories.tsx) for more snippets to copy.

## Help

If there are any examples you'd like to see or use cases I didn't cover, please [file an issue](https://github.com/benshope/map-panel/issues/new).
