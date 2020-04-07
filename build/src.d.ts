import React from 'react';
export declare type BackgroundDivProps = {
    panelOpen: number;
    breakpoint: number;
};
export declare const PanelContainerDiv: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const BackgroundDiv: import("styled-components").StyledComponent<"div", any, BackgroundDivProps, never>;
export declare type PanelDivProps = {
    panelOpen: number;
    breakpoint: number;
    margin: number;
    minHeight: number;
};
export declare const PanelDiv: import("styled-components").StyledComponent<"div", any, PanelDivProps, never>;
export declare type LayoutProps = {
    panelOpen?: number;
    breakpoint?: number;
    minHeight?: number;
    maxWidth?: number;
    margin?: number;
    snapback?: number;
    panel?: React.FunctionComponent<PanelDivProps>;
    container?: React.FunctionComponent<{}>;
    background?: React.FunctionComponent<BackgroundDivProps>;
    children: (props: {
        panelOpen: number;
        closePanel: () => void;
    }) => React.ReactNode;
};
export declare const Layout: React.FC<LayoutProps>;
export default Layout;
