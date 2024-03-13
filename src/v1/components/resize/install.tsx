import React, { useState } from 'react';
import { ResizeButton as InternalResizeButton } from './resize-button';
import { ResizeDialog } from './resize-dialog';

export function installResize(
    getCanvasSize : () => ({width : number, height : number}),
    resize : (newWidth : number, newHeight : number) => void
) {
    const ResizeButton = () => {
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
                    getCanvasSize={getCanvasSize}
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
