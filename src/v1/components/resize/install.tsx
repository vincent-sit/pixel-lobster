import React, { useState } from 'react';
import { ResizeButton as InternalResizeButton } from './resize-button';
import { ResizeDialog } from './resize-dialog';
import { useSnapshot } from 'valtio';
import { CanvasState } from '../canvas/state';

export function installResize(
    canvasState : CanvasState,
    resize : (newWidth : number, newHeight : number) => void
) {
    const ResizeButton = () => {
        const snap = useSnapshot(canvasState);
        const [isOpen, setIsOpen] = useState(false);

        const onSubmit = (newWidth : number, newHeight : number) => {
            resize(newWidth, newHeight);
            setIsOpen(false);
        };

        const onCloseClick = () => setIsOpen(false);

        return (
            <>
                <InternalResizeButton onClick={() => setIsOpen(true)}/>
                <ResizeDialog
                    initialWidth={snap.width}
                    initialHeight={snap.height}
                    isOpen={isOpen}
                    onSubmit={onSubmit}
                    onCloseClick={onCloseClick}
                />
            </>
        );

    };

    return {
        ResizeButton
    };
}
