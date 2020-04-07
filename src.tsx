import React from 'react'
import styled from 'styled-components'

type BackgroundDivProps = {
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
    pointerEvents: panelOpen > 0.5 ? 'auto' : 'none',
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

type PanelDivProps = {
  panelOpen: number
  breakpoint: number
  margin: number
  minHeight: number
  maxWidth: number
}

export const PanelDiv = styled.div.attrs<PanelDivProps>(({ panelOpen }) => ({
  style: {
    cursor: !panelOpen ? 'pointer' : 'auto',
    overflowY: panelOpen ? 'auto' : 'hidden'
  }
}))<PanelDivProps>`
  position: absolute;
  margin: auto 0px;
  background: white;
  box-shadow: 0px 0px 5px black;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: column;
  left: 0;
  max-width: ${({ maxWidth }) => maxWidth}px;
  width: 100%;
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
  innerScrollPx: number
  innerScroll: number
  outerScrollPx: number
  outerScroll: number
}

type LayoutProps = {
  panelOpen?: number
  breakpoint?: number
  minHeight?: number
  maxWidth?: number
  margin?: number
  snapback?: number
  // middleware?: (props: StateProps) => StateProps;
  children: (panelOpen: number) => React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({
  children,
  snapback = 48,
  minHeight = 128,
  breakpoint = 1024,
  maxWidth = 512,
  margin = 16,
  Panel = PanelDiv,
  PanelContainer = PanelContainerDiv,
  Background = BackgroundDiv
}) => {
  const [state, setState] = React.useState<StateProps>({
    isOpen: false,
    innerScrollPx: 0,
    innerScroll: 0,
    outerScrollPx: 0,
    outerScroll: 0
  })
  const containerRef = React.useRef<HTMLDivElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)

  const [reCenterMap, setReCenterMap] = React.useState<() => void | void>()

  const closePanel = () => {
    if (panelRef.current) {
      panelRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const openPanel = () => {
    if (containerRef.current && panelRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.offsetHeight,
        behavior: 'smooth'
      })
    }
  }

  const setProps = props => setState({ ...state, ...props })
  const snapScroll = () =>
    state.outerScroll > 0.5 ? openPanel() : closePanel()

  const onOuterScroll = (e: React.UIEvent<HTMLElement>) =>
    setProps({
      outerScrollPx: e.currentTarget.scrollTop,
      outerScroll:
        e.currentTarget.scrollTop /
        (e.currentTarget.scrollHeight - e.currentTarget.offsetHeight)
    })
  const onInnerScroll = (e: React.UIEvent<HTMLElement>) =>
    setProps({
      innerScrollPx: e.currentTarget.scrollTop,
      innerScroll: e.currentTarget.scrollTop
    })

  const panelOpen = state.outerScroll
  return (
      <PanelContainer
        ref={containerRef}
        onScroll={onOuterScroll}
        onTouchEnd={snapScroll}
        onMouseUp={snapScroll}
      >
        <Background onClick={closePanel} panelOpen={panelOpen} breakpoint={breakpoint} />
        <Panel
          ref={panelRef}
          maxWidth={maxWidth}
          minHeight={minHeight}
          margin={margin}
          breakpoint={breakpoint}
          onClick={!panelOpen ? openPanel : () => null}
          panelOpen={panelOpen}
          onScroll={onInnerScroll}
        >
          {children({panelOpen, closePanel})}
        </Panel>
      </PanelContainer>
  )
}

export default Layout
