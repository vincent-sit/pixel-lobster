import React from 'react';
import { ExportCanvasButton as InternalExportCanvasButton } from './export-canvas-button';
import { ExportCanvasPresenter } from './presenter';

export function installExportCanvas(canvas : HTMLCanvasElement) {
    const presenter = new ExportCanvasPresenter();

    const ExportCanvasButton = () => {
        return <InternalExportCanvasButton onClick={() => presenter.export(canvas)}/>;
    };

    return {
        ExportCanvasButton
    };
}
