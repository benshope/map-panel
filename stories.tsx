import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

const MockMapDiv = styled.div`
width: 100%
height: 100%;
background: linear-gradient(to right, #30e8bf, #ff8235);
`

import Layout from './src'

const stories = storiesOf('Over-Map Layout', module).add('default', () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '70vh', border: '2px solid black' }}>
      <Layout>{(props) => <div style={{height: '200vh'}}>`Layout content ${JSON.stringify(props)}`</div>}</Layout>
      <MockMapDiv />
    </div>
  )
})
