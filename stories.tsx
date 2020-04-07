import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import OverMapLayout, {PanelDiv, BackgroundDiv} from './src'

const StyledPanelDiv = styled(PanelDiv)`
    background: purple;
    border-radius: 30px 30px 0 0;
`

const StyledBackgroundDiv = styled(BackgroundDiv).attrs(({ panelOpen }) => ({
  style: {
    zIndex: panelOpen ? 2 : 0,
    background: `hsla(50, 50%, 50%, ${panelOpen})`
  }
}))`
  border: 2px solid red;
`

const MockMapDiv = styled.div`
width: 100%;
height: 100%;
pointer-events: all;
position: absolute;
background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364); 
`

const stories = storiesOf('Over-Map Layout', module).add('default', () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '70vh'}}>
      <OverMapLayout>{({panelOpen, closePanel}) => <div style={{height: '200vh'}}>{`Panel Open ${parseInt(panelOpen * 100)}%`}<button style={{opacity: panelOpen}} onClick={closePanel}>Close Panel</button></div>}</OverMapLayout>
      <MockMapDiv onClick={() => console.log('map clicked')} />
    </div>
  )
}).add('with style overrides', () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '70vh'}}>
      <OverMapLayout panel={StyledPanelDiv} background={StyledBackgroundDiv}>{({panelOpen, closePanel}) => <div style={{height: '200vh'}}>{`Panel Open ${parseInt(panelOpen * 100)}%`}<button style={{opacity: panelOpen}} onClick={closePanel}>Close Panel</button></div>}</OverMapLayout>
      <MockMapDiv onClick={() => console.log('map clicked')} />
    </div>
  )
})
