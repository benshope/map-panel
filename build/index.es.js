import React from 'react';
import styled from 'styled-components';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var PanelContainerDiv = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n  width: 100%;\n  left: 0;\n  top: 0;\n  position: absolute;\n  overflow-y: auto;\n  &::-webkit-scrollbar {\n    display: none;\n  }\n  -ms-overflow-style: none;\n"], ["\n  height: 100%;\n  width: 100%;\n  left: 0;\n  top: 0;\n  position: absolute;\n  overflow-y: auto;\n  &::-webkit-scrollbar {\n    display: none;\n  }\n  -ms-overflow-style: none;\n"])));
var BackgroundDiv = styled.div.attrs(function (_a) {
    var panelOpen = _a.panelOpen;
    return ({
        style: {
            zIndex: panelOpen ? 2 : 0,
            background: "hsla(0,0%,0%, " + panelOpen / 4 + ")"
        }
    });
})(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: sticky;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 1;\n  @media (min-width: ", "px) {\n    opacity: 0;\n    pointer-events: none;\n  }\n"], ["\n  position: sticky;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 1;\n  @media (min-width: ", "px) {\n    opacity: 0;\n    pointer-events: none;\n  }\n"])), function (_a) {
    var breakpoint = _a.breakpoint;
    return breakpoint;
});
var PanelDiv = styled.div.attrs(function (_a) {
    var margin = _a.margin, panelOpen = _a.panelOpen;
    return ({
        style: {
            cursor: !panelOpen ? 'pointer' : 'auto',
            overflowY: panelOpen ? 'auto' : 'hidden',
            width: "calc(100% - " + (1 - panelOpen) * margin + "px)"
        }
    });
})(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  z-index: 2;\n  position: absolute;\n  margin: auto 0px;\n  background: white;\n  border-radius: 8px 8px 0px 0px;\n  display: flex;\n  flex-direction: column;\n  left: 0;\n  max-width: 448px;\n  max-height: calc(100% - ", "px);\n  pointer-events: all;\n  left: 50%;\n  transform: translateX(-50%);\n  top: calc(100% - ", "px);\n  @media (min-width: ", "px) {\n    cursor: auto !important;\n    top: auto;\n    bottom: 0;\n    left: ", "px;\n    transform: translateX(0%);\n  }\n"], ["\n  z-index: 2;\n  position: absolute;\n  margin: auto 0px;\n  background: white;\n  border-radius: 8px 8px 0px 0px;\n  display: flex;\n  flex-direction: column;\n  left: 0;\n  max-width: 448px;\n  max-height: calc(100% - ", "px);\n  pointer-events: all;\n  left: 50%;\n  transform: translateX(-50%);\n  top: calc(100% - ", "px);\n  @media (min-width: ", "px) {\n    cursor: auto !important;\n    top: auto;\n    bottom: 0;\n    left: ", "px;\n    transform: translateX(0%);\n  }\n"])), function (_a) {
    var margin = _a.margin;
    return margin;
}, function (_a) {
    var minHeight = _a.minHeight;
    return minHeight;
}, function (_a) {
    var breakpoint = _a.breakpoint;
    return breakpoint;
}, function (_a) {
    var margin = _a.margin;
    return margin;
});
var Layout = function (_a) {
    var children = _a.children, _b = _a.snapback, snapback = _b === void 0 ? 48 : _b, _c = _a.minHeight, minHeight = _c === void 0 ? 128 : _c, _d = _a.breakpoint, breakpoint = _d === void 0 ? 1024 : _d, _e = _a.margin, margin = _e === void 0 ? 16 : _e, _f = _a.panel, panel = _f === void 0 ? PanelDiv : _f, _g = _a.container, container = _g === void 0 ? PanelContainerDiv : _g, _h = _a.background, background = _h === void 0 ? BackgroundDiv : _h;
    var _j = React.useState({
        isOpen: false,
        innerScroll: 0,
        outerScroll: 0
    }), state = _j[0], setState = _j[1];
    var containerRef = React.useRef(null);
    var panelRef = React.useRef(null);
    var setProps = function (props) { return setState(__assign(__assign({}, state), props)); };
    var closePanel = function () {
        if (panelRef.current) {
            panelRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            setProps({ isOpen: false });
        }
    };
    var openPanel = function () {
        if (containerRef.current && panelRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.offsetHeight,
                behavior: 'smooth'
            });
            setProps({ isOpen: true });
        }
    };
    var snapScroll = function () {
        if (containerRef.current) {
            var offset = state.isOpen ?
                containerRef.current.scrollTop :
                containerRef.current.scrollHeight - containerRef.current.scrollTop;
            return Math.abs(offset) > snapback ? openPanel() : closePanel();
        }
    };
    var onOuterScroll = function (e) {
        return setProps({
            outerScroll: e.currentTarget.scrollTop /
                (e.currentTarget.scrollHeight - e.currentTarget.offsetHeight)
        });
    };
    var onInnerScroll = function (e) {
        return setProps({
            innerScroll: e.currentTarget.scrollTop
        });
    };
    var panelOpen = state.outerScroll;
    var Panel = panel;
    var Container = container;
    var Background = background;
    return (React.createElement(Container, { ref: containerRef, onScroll: onOuterScroll, onTouchEnd: snapScroll, onMouseUp: snapScroll },
        React.createElement(Background, { onClick: closePanel, panelOpen: panelOpen, breakpoint: breakpoint }),
        React.createElement(Panel, { ref: panelRef, minHeight: minHeight, margin: margin, breakpoint: breakpoint, onClick: !panelOpen ? openPanel : function () { return null; }, panelOpen: panelOpen, onScroll: onInnerScroll }, children({ panelOpen: panelOpen, closePanel: closePanel }))));
};
var templateObject_1, templateObject_2, templateObject_3;

export default Layout;
export { BackgroundDiv, Layout, PanelContainerDiv, PanelDiv };
//# sourceMappingURL=index.es.js.map
