/// <reference types="react" />
import { FlowRendererProps } from '../FlowRenderer';
declare type ZoomPaneProps = Omit<FlowRendererProps, 'deleteKeyCode' | 'selectionKeyCode' | 'multiSelectionKeyCode' | 'noDragClassName' | 'disableKeyboardA11y'> & {
    selectionKeyPressed: boolean;
};
declare const ZoomPane: ({ onMove, onMoveStart, onMoveEnd, zoomOnScroll, zoomOnPinch, panOnScroll, panOnScrollSpeed, panOnScrollMode, zoomOnDoubleClick, selectionKeyPressed, elementsSelectable, panOnDrag, defaultViewport, translateExtent, minZoom, maxZoom, zoomActivationKeyCode, preventScrolling, children, noWheelClassName, noPanClassName, }: ZoomPaneProps) => JSX.Element;
export default ZoomPane;
//# sourceMappingURL=index.d.ts.map