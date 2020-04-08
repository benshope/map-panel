import React from "react";
import styled from "styled-components";

export type BackgroundDivProps = {
  panelY: number;
  breakpoint: number;
};

export const PanelContainerDiv = styled.div`
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: absolute;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;

export type InnerScrollDivProps = {
  breakpoint: number;
  panelY: number;
};

export const InnerScrollDiv = styled.div<InnerScrollDivProps>`
  flex: 1;
  overflow-y: auto;
  flex-shrink: ${({ panelY }) => (panelY === 1 ? 1 : 0)};
  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    flex-shrink: 1;
  }
`;

export const BackgroundDiv = styled.div.attrs<BackgroundDivProps>(
  ({ panelY }) => ({
    style: {
      zIndex: panelY ? 2 : 0,
      background: `hsla(0,0%,0%, ${panelY / 4})`
    }
  })
)<BackgroundDivProps>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    opacity: 0;
    pointer-events: none;
  }
`;

export type PanelDivProps = {
  panelY: number;
  breakpoint: number;
  margin: number;
  minHeight: number;
};

export const PanelDiv = styled.div.attrs<PanelDivProps>(
  ({ margin, panelY }) => ({
    style: {
      cursor: !panelY ? "pointer" : "auto",
      width: `calc(100% - ${(1 - panelY) * margin}px)`
    }
  })
)<PanelDivProps>`
  z-index: 2;
  position: absolute;
  margin: auto 0px;
  display: flex;
  flex-direction: column;
  background: white;
  overflow-y: hidden;
  border-radius: 8px 8px 0px 0px;
  left: 0;
  max-width: 448px;
  max-height: calc(100% - ${({ margin }) => margin}px);
  pointer-events: all;
  left: 50%;
  transform: translateX(-50%);
  min-height: ${({ minHeight }) => minHeight}px;
  top: calc(100% - ${({ minHeight }) => minHeight}px);
  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    cursor: auto !important;
    top: auto;
    bottom: 0;
    left: ${({ margin }) => margin}px;
    transform: translateX(0%);
  }
`;

type StateProps = {
  isOpen: boolean;
  panelY: number;
};

export type LayoutProps = {
  onScroll?: (panelState: number) => void;
  isOpen?: boolean;
  breakpoint?: number;
  minHeight?: number;
  maxWidth?: number;
  margin?: number;
  snapback?: number;
  panel?: React.FunctionComponent<PanelDivProps>;
  container?: React.FunctionComponent<{}>;
  background?: React.FunctionComponent<BackgroundDivProps>;
};

export const Layout: React.FC<LayoutProps> = React.memo(
  ({
    children,
    onScroll,
    isOpen,
    snapback = 48,
    minHeight = 128,
    breakpoint = 1024,
    margin = 16,
    panel = PanelDiv,
    container = PanelContainerDiv,
    background = BackgroundDiv
  }) => {
    const [state, setState] = React.useState<StateProps>({
      isOpen: false,
      panelY: 0
    });
    const containerRef = React.useRef<HTMLDivElement>(null);
    const panelRef = React.useRef<HTMLDivElement>(null);

    const setProps = (props: Partial<StateProps>) => {
      setState({ ...state, ...props });
    };

    const closePanel = () => {
      if (panelRef.current) {
        panelRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (containerRef.current) {
        containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    const openPanel = () => {
      if (containerRef.current && panelRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.offsetHeight,
          behavior: "smooth"
        });
      }
    };

    React.useEffect(() => {
      if (isOpen !== undefined) {
        (isOpen ? openPanel : closePanel)();
      }
    }, [isOpen, containerRef.current]);

    const snapScroll = () => {
      if (
        containerRef.current &&
        ((state.isOpen && state.panelY < 1) ||
          (!state.isOpen && state.panelY > 0))
      ) {
        const offset = state.isOpen
          ? containerRef.current.scrollTop
          : containerRef.current.scrollHeight - containerRef.current.scrollTop;
        return Math.abs(offset) > snapback ? openPanel() : closePanel();
      }
    };

    const onScrollPanel = (e: React.UIEvent<HTMLElement>) => {
      const panelY =
        e.currentTarget.scrollTop /
        (e.currentTarget.scrollHeight - e.currentTarget.offsetHeight);
      setProps({
        isOpen: panelY === 1 ? true : panelY === 0 ? false : state.isOpen,
        panelY
      });
      if (onScroll) {
        onScroll(panelY);
      }
    };

    const Panel = panel;
    const Container = container;
    const Background = background;
    return (
      <Container
        ref={containerRef}
        onScroll={onScrollPanel}
        onTouchEnd={snapScroll}
      >
        <Background
          onClick={closePanel}
          panelY={state.panelY}
          breakpoint={breakpoint}
        />
        <Panel
          ref={panelRef}
          minHeight={minHeight}
          margin={margin}
          breakpoint={breakpoint}
          onClick={!state.panelY ? openPanel : () => null}
          panelY={state.panelY}
        >
          {children}
        </Panel>
      </Container>
    );
  }
);

export default Layout;
