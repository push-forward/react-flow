import { useCallback, CSSProperties } from 'react';
import {
  Node,
  ReactFlowState,
  useStore,
  getRectOfNodes,
  Transform,
  Rect,
  Position,
  internalsSymbol,
} from '@reactflow/core';
import cc from 'classcat';
import shallow from 'zustand/shallow';

import NodeToolbarPortal from './NodeToolbarPortal';
import { NodeToolbarProps } from './types';

type SelectedNode = Node | undefined;

const nodeEqualityFn = (a: SelectedNode, b: SelectedNode) =>
  a?.positionAbsolute?.x === b?.positionAbsolute?.x &&
  a?.positionAbsolute?.y === b?.positionAbsolute?.y &&
  a?.width === b?.width &&
  a?.height === b?.height &&
  a?.selected === b?.selected &&
  a?.[internalsSymbol]?.z === b?.[internalsSymbol]?.z;

const storeSelector = (state: ReactFlowState) => ({
  transform: state.transform,
  nodeOrigin: state.nodeOrigin,
  selectedNodesCount: Array.from(state.nodeInternals.values()).filter((node) => node.selected).length,
});

function getTransform(nodeRect: Rect, transform: Transform, position: Position, offset: number): string {
  // position === Position.Top
  let xPos = (nodeRect.x + nodeRect.width / 2) * transform[2] + transform[0];
  let yPos = nodeRect.y * transform[2] + transform[1] - offset;
  let xShift = -50;
  let yShift = -100;

  switch (position) {
    case Position.Right:
      xPos = (nodeRect.x + nodeRect.width) * transform[2] + transform[0] + offset;
      yPos = (nodeRect.y + nodeRect.height / 2) * transform[2] + transform[1];
      xShift = 0;
      yShift = -50;
      break;
    case Position.Bottom:
      yPos = (nodeRect.y + nodeRect.height) * transform[2] + transform[1] + offset;
      yShift = 0;
      break;
    case Position.Left:
      xPos = nodeRect.x * transform[2] + transform[0] - offset;
      yPos = (nodeRect.y + nodeRect.height / 2) * transform[2] + transform[1];
      xShift = -100;
      yShift = -50;
      break;
  }

  return `translate(${xPos}px, ${yPos}px) translate(${xShift}%, ${yShift}%)`;
}

function NodeToolbar({
  nodeId,
  children,
  className,
  style,
  isVisible,
  position = Position.Top,
  offset = 10,
  ...rest
}: NodeToolbarProps) {
  const nodeSelector = useCallback((state: ReactFlowState): SelectedNode => state.nodeInternals.get(nodeId), [nodeId]);
  const node = useStore(nodeSelector, nodeEqualityFn);
  const { transform, nodeOrigin, selectedNodesCount } = useStore(storeSelector, shallow);
  const isActive = typeof isVisible === 'boolean' ? isVisible : node?.selected && selectedNodesCount === 1;

  if (!isActive || !node) {
    return null;
  }

  const nodeRect: Rect = getRectOfNodes([node], nodeOrigin);

  const wrapperStyle: CSSProperties = {
    position: 'absolute',
    transform: getTransform(nodeRect, transform, position, offset),
    zIndex: (node[internalsSymbol]?.z || 1) + 1,
    ...style,
  };

  return (
    <NodeToolbarPortal>
      <div style={wrapperStyle} className={cc(['react-flow__node-toolbar', className])} {...rest}>
        {children}
      </div>
    </NodeToolbarPortal>
  );
}

export default NodeToolbar;
