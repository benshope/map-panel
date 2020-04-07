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
import TimezonePicker from 'over-map-layout';

const MyComponent() => {
        return (
            <TimezonePicker onChange={console.log} />
        )
    })
```

## Use With Options

```jsx
import React from 'react';
import TimezonePicker from 'over-map-layout';

const MyComponent() => {
        return (
            <TimezonePicker
                onChange={console.log}
                defaultValue={'America/New_York'}
                unselectLabel="No Timezone"
                style={{
                    borderRadius: '0.5rem',
                    background: 'teal',
                    color: 'white',
                }}
            />
        )
    })
```

## Options

Customize timezone picker by passing these, or any other props valid on the `<select />` element, to the component:

| Prop          | Description                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------- |
| onChange      | initial open state of the modal                                                                    |
| defaultValue  | the value the timezone picker is initially set to                                                  |
| value         | pass a value into the picker making it a controlled component                                      |
| unselectLabel | the label for selecting undefined (the undefined option does not appear without a label specified) |
| style         | styles for the <select> element                                                                    |

See the [examples](https://benshope.github.io/over-map-layout) and the [examples source code](https://github.com/benshope/over-map-layout/blob/master/stories.js) for more snippets to copy.

## Help

If there are any examples you'd like to see or use cases I didn't cover, please [file an issue](https://github.com/benshope/over-map-layout/issues/new).
