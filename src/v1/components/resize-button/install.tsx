import React from 'react';
import { ResizeCanvasButton as InternalResizeCanvasButton } from './resize-button';
import { ResizeCanvasPresenter } from './presenter';

export function installResizeCanvas(getDialog : () => HTMLElement | null) {
    const presenter = new ResizeCanvasPresenter();

    const ResizeCanvasButton = () => {
        return <InternalResizeCanvasButton onClick={() => presenter.showModal(getDialog)}/>;
    };

    return {
        ResizeCanvasButton
    };
}
