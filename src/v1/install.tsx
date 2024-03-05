import React from 'react';
import { Skeleton } from './components/skeleton/skeleton';
import { installDisplay } from './components/display/install';
import { installCanvas } from './components/canvas/install';
import { installZoom } from './components/zoom/install';
import { installExportCanvas } from './components/export-canvas/install';
import { installClearCanvas } from './components/clear-canvas/install';
import { installPaintBrush } from './components/paint-brush/install';

export function installApp() {
    const { state : zoomState, updateZoomFactor } = installZoom();
    const { draw } = installPaintBrush();
    const { Canvas, canvasElement } = installCanvas(zoomState, draw);
    const { Display } = installDisplay(zoomState, updateZoomFactor, Canvas);
    const { ExportCanvasButton } = installExportCanvas(canvasElement);
    const { ClearCanvasButton } = installClearCanvas(canvasElement);

    // const ResizeDialog = installResizeDialog();
    // const { ColorPicker } = installColorPicker();

    const App = () => (
        <Skeleton 
            Display={Display}
            ResizeDialog={() => null}
            ExportCanvasButton={ExportCanvasButton}
            ClearCanvasButton={ClearCanvasButton}
            ColorPicker={() => null}
        />
    );

    return {
        App,
    };
}
