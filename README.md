# Over-Map Layout

![gzip size](http://img.badgesize.io/https://unpkg.com/over-map-layout/dist/index.js?compression=gzip&style=for-the-badge)
[![npm version](https://img.shields.io/npm/v/over-map-layout.svg?style=for-the-badge)](https://www.npmjs.com/package/over-map-layout)
[![npm downloads](https://img.shields.io/npm/dm/over-map-layout.svg?style=for-the-badge)](https://www.npmjs.com/package/over-map-layout)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://en.wikipedia.org/wiki/MIT_License)

This is a React component for adding a responsive, mobile-ready layout over a map. The implementation is one file, it can be styled, and it has no dependencies.

## Install

- **Npm:** `npm install over-map-layout`
- **Yarn:** `yarn add over-map-layout`

## Use

```jsx
import React from 'react';
import OverMapLayout from 'over-map-layout';

const MyComponent() => (
    <div style={{ position: 'relative', width: '100%', height: '70vh'}}>
      <OverMapLayout>{({panelOpen, closePanel}) =>
        <div style={{height: '200vh'}}>
            {`Panel Open ${parseInt(panelOpen * 100)}%`}<button style={{opacity: panelOpen}} onClick={closePanel}>Close Panel</button>
        </div>}
      </OverMapLayout>
      <Map />
    </div>
  );
```

See the [examples](https://benshope.github.io/over-map-layout) and the [examples source code](https://github.com/benshope/over-map-layout/blob/master/stories.js) for more snippets to copy.

## Help

If there are any examples you'd like to see or use cases I didn't cover, please [file an issue](https://github.com/benshope/over-map-layout/issues/new).
