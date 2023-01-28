/**
 * The user selection rectangle gets displayed when a user drags the mouse while pressing shift
 */
/// <reference types="react" />
import type { ReactFlowProps } from '../../types';
declare type UserSelectionProps = {
    isSelectionMode: boolean;
    selectBoxMode?: ReactFlowProps['selectBoxMode'];
    onSelectionStart?: (e: React.MouseEvent) => void;
    onSelectionEnd?: (e: React.MouseEvent) => void;
    onClick?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    onWheel?: (e: React.WheelEvent) => void;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseMove?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    children: React.ReactNode;
};
declare const UserSelection: import("react").MemoExoticComponent<({ isSelectionMode, selectBoxMode, onSelectionStart, onSelectionEnd, onClick, onContextMenu, onWheel, onMouseEnter, onMouseMove, onMouseLeave, children, }: UserSelectionProps) => JSX.Element>;
export default UserSelection;
//# sourceMappingURL=index.d.ts.map