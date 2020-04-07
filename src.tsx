import React from 'react'
import styled from 'styled-components'

export type BackgroundDivProps = {
  panelOpen: number
  breakpoint: number
}

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
`

export const BackgroundDiv = styled.div.attrs<BackgroundDivProps>(({ panelOpen }) => ({
  style: {
    zIndex: panelOpen ? 2 : 0,
    background: `hsla(0,0%,0%, ${panelOpen / 4})`
  }
}))<BackgroundDivProps>`
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
`

export type PanelDivProps = {
  panelOpen: number
  breakpoint: number
  margin: number
  minHeight: number
}

export const PanelDiv = styled.div.attrs<PanelDivProps>(({ margin, panelOpen }) => ({
  style: {
    cursor: !panelOpen ? 'pointer' : 'auto',
    overflowY: panelOpen ? 'auto' : 'hidden',
    width: `calc(100% - ${(1 - panelOpen) * margin}px)`
  }
}))<PanelDivProps>`
  z-index: 2;
  position: absolute;
  margin: auto 0px;
  background: white;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: column;
  left: 0;
  max-width: 448px;
  max-height: calc(100% - ${({ margin }) => margin}px);
  pointer-events: all;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% - ${({ minHeight }) => minHeight}px);
  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    cursor: auto !important;
    top: auto;
    bottom: 0;
    left: ${({ margin }) => margin}px;
    transform: translateX(0%);
  }
`

type StateProps = {
  isOpen: boolean
  innerScroll: number
  outerScroll: number
}

export type LayoutProps = {
  panelOpen?: number
  breakpoint?: number
  minHeight?: number
  maxWidth?: number
  margin?: number
  snapback?: number
  panel?: React.FunctionComponent<PanelDivProps>
  container?: React.FunctionComponent<{}>
  background?: React.FunctionComponent<BackgroundDivProps>
  children: (props: {panelOpen: number; closePanel: () => void;}) => React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({
  children,
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
    innerScroll: 0,
    outerScroll: 0
  })
  const containerRef = React.useRef<HTMLDivElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)

  const setProps = (props: Partial<StateProps>) => setState({ ...state, ...props })

  const closePanel = () => {
    if (panelRef.current) {
      panelRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      setProps({isOpen: false});
    }
  }

  const openPanel = () => {
    if (containerRef.current && panelRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.offsetHeight,
        behavior: 'smooth'
      })
      setProps({isOpen: true});
    }
  }

  const snapScroll = () => {
      if (containerRef.current) {
            const offset = state.isOpen ? 
           containerRef.current.scrollTop :
           containerRef.current.scrollHeight - containerRef.current.scrollTop;
           return Math.abs(offset) > snapback ? openPanel() : closePanel();
      }
  }

  const onOuterScroll = (e: React.UIEvent<HTMLElement>) =>
    setProps({
      outerScroll:
        e.currentTarget.scrollTop /
        (e.currentTarget.scrollHeight - e.currentTarget.offsetHeight)
    })
  const onInnerScroll = (e: React.UIEvent<HTMLElement>) =>
    setProps({
      innerScroll: e.currentTarget.scrollTop
    })

  const panelOpen = state.outerScroll
  const Panel = panel;
  const Container = container;
  const Background = background;
  return (
      <Container
        ref={containerRef}
        onScroll={onOuterScroll}
        onTouchEnd={snapScroll}
        onMouseUp={snapScroll}
      >
        <Background onClick={closePanel} panelOpen={panelOpen} breakpoint={breakpoint} />
        <Panel
          ref={panelRef}
          minHeight={minHeight}
          margin={margin}
          breakpoint={breakpoint}
          onClick={!panelOpen ? openPanel : () => null}
          panelOpen={panelOpen}
          onScroll={onInnerScroll}
        >
          {children({panelOpen, closePanel})}
        </Panel>
      </Container>
  )
}

export default Layout
