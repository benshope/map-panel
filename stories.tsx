import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

import OverMapLayout, {
  PanelDiv,
  BackgroundDiv,
  InnerScrollDiv,
  BackgroundDivProps
} from "./index";

const MockMapDiv = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: all;
  position: absolute;
  background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
`;

const stories = storiesOf("Over-Map Layout", module);

stories.add("inner scroll", () => {
  const breakpoint = 1024;
  const [panelY, setPanelY] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(null);

  return (
    <div style={{ position: "relative", width: "100%", height: "70vh" }}>
      <OverMapLayout
        breakpoint={breakpoint}
        onScroll={newPanelY => {
          setPanelY(newPanelY);
          newPanelY === 1 && setIsOpen(true);
          newPanelY === 0 && setIsOpen(false);
        }}
        isOpen={isOpen}
      >
        <div
          style={{
            flex: 0,
            padding: "1rem",
            background: "#f2f2f2"
          }}
        >
          Header Content
        </div>
        <InnerScrollDiv breakpoint={breakpoint} panelY={panelY}>
          <div style={{ height: "200vh", padding: "1rem" }}>
            <p>{`Components can listen on panelY: ${panelY.toFixed(2)}`}</p>
            <p>
              {`The panel can also be opened or closed`}
              <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Close" : "Open"} Panel
              </button>
            </p>
          </div>
        </InnerScrollDiv>
      </OverMapLayout>
      <MockMapDiv />
    </div>
  );
});

// style overrides
const StyledPanelDiv = styled(PanelDiv)`
  background: purple;
  border-radius: 30px 30px 0 0;
  text-align: center;
`;

// attrs overrides
const StyledBackgroundDiv = styled(BackgroundDiv).attrs<BackgroundDivProps>(
  ({ panelY }) => ({
    style: {
      zIndex: panelY ? 2 : 0,
      background: `hsla(${150 * panelY}, 50%, 50%, ${panelY})`
    }
  })
)``;

stories.add("styled", () => (
  <div style={{ position: "relative", width: "100%", height: "70vh" }}>
    <OverMapLayout panel={StyledPanelDiv} background={StyledBackgroundDiv}>
      <div style={{ minHeight: "200vh" }}>{`Panel With Fancy Styles`}</div>
    </OverMapLayout>
    <MockMapDiv />
  </div>
));

stories.add("short scroll", () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "70vh" }}>
      <OverMapLayout>
        <div style={{ height: "50vh" }}>{`Panel Content`}</div>
      </OverMapLayout>
      <MockMapDiv />
    </div>
  );
});

stories.add("no scroll", () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "70vh" }}>
      <OverMapLayout>
        <div style={{ flex: 1 }}>{`Panel Content`}</div>
      </OverMapLayout>
      <MockMapDiv />
    </div>
  );
});
