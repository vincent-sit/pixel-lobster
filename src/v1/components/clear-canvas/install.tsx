import React from 'react';
import { ClearCanvasPresenter } from './presenter';
import { ClearCanvasButton as InternalClearCanvasButton } from './clear-canvas-button';

export function installClearCanvas(canvas : HTMLCanvasElement) {
    const presenter = new ClearCanvasPresenter();

    const ClearCanvasButton = () => {
        return <InternalClearCanvasButton onClick={() => presenter.clear(canvas)}/>;
    };

    return {
        ClearCanvasButton
    };
}
