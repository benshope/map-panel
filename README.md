# Over-Map Layout

[![gzip size](https://img.shields.io/bundlephobia/minzip/over-map-layout?label=gzip%20size&style=for-the-badge)](https://bundlephobia.com/result?p=over-map-layout)
[![npm version](https://img.shields.io/npm/v/over-map-layout.svg?style=for-the-badge)](https://www.npmjs.com/package/over-map-layout)
[![npm downloads](https://img.shields.io/npm/dm/over-map-layout.svg?style=for-the-badge)](https://www.npmjs.com/package/over-map-layout)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://en.wikipedia.org/wiki/MIT_License)

This is a React/Typescript component for adding a responsive, mobile-ready layout over a map. The implementation is just one file, it can be styled, and it has only peer dependencies.

## Install

- **Npm:** `npm install over-map-layout`
- **Yarn:** `yarn add over-map-layout`

## Basic Example

```jsx
import React from "react";
import OverMapLayout from "over-map-layout";

const MyComponent = () => (
  <div style={{ position: "relative", width: "100%", height: "70vh" }}>
    <OverMapLayout>
      <div style={{ flex: 1 }}>{`Panel Content`}</div>
    </OverMapLayout>
    <Map />
  </div>
);
```

## Scrolling & Controls Example

```jsx
import React from "react";
import OverMapLayout, { InnerScrollDiv } from "over-map-layout";

const MyComponent = () => {
  const breakpoint = 1024;
  const [panelY, setPanelY] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(null);
  return (
    <div style={{ position: "relative", width: "100%", height: "70vh" }}>
      <OverMapLayout
        breakpoint={breakpoint}
        onScroll={(newPanelY) => {
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
      </OverMapLayout>
      <Map />
    </div>
  );
};
```

See the [examples](https://benshope.github.io/over-map-layout) and the [examples source code](https://github.com/benshope/over-map-layout/blob/master/stories.tsx) for more snippets to copy.

## Help

If there are any examples you'd like to see or use cases I didn't cover, please [file an issue](https://github.com/benshope/over-map-layout/issues/new).
