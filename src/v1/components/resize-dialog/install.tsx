import React from 'react';
import { ResizeDialog as InternalResizeDialog } from './resize-dialog';
import { CanvasState } from '../canvas/state';
import { ResizeDialogPresenter } from './presenter';
import { useSnapshot } from 'valtio';

export function installResizeDialog(
    canvasState : CanvasState,
    canvas : HTMLCanvasElement
) {
    const presenter = new ResizeDialogPresenter();
    const dialogId = 'resizeDialog';
    const getDialog = () => {return document.getElementById(dialogId);};
    
    const onSubmit = (newHeight : number, newWidth : number) => presenter.resize(canvasState, newHeight, newWidth);
    
    const ResizeDialog = () => {
        const snap = useSnapshot(canvasState);
        return <InternalResizeDialog 
            dialogId={dialogId}
            width={snap.width}
            height={snap.height}
            onSubmit={onSubmit}
            canvas={canvas}
        />;
    };
    
    return {
        getDialog,
        ResizeDialog
    };
}
