import React from 'react';
import { Skeleton } from './components/skeleton/skeleton';
import { installDisplay } from './components/display/install';
import { installCanvas } from './components/canvas/install';
import { installZoom } from './components/zoom/install';
import { installExportCanvas } from './components/export-canvas/install';
import { installClearCanvas } from './components/clear-canvas/install';
import { installPaintBrush } from './components/paint-brush/install';
import { installEraser } from './components/eraser/install.tsx';
import { installToolManagement } from './components/tool-management/install';
import { installColorPicker } from './components/color-picker/install.tsx';

export function installApp() {
    const { state : zoomState, updateZoomFactor } = installZoom();
    const { state : toolState } = installToolManagement();
    const { draw, PaintbrushButton } = installPaintBrush(toolState);
    const { erase, EraserButton } = installEraser(toolState);
    const { pick, ColorPickerButton } = installColorPicker(toolState);
    const { Canvas, canvasElement } = installCanvas(zoomState, draw, erase, toolState);
    const { Display } = installDisplay(zoomState, updateZoomFactor, Canvas);
    const { ExportCanvasButton } = installExportCanvas(canvasElement);
    const { ClearCanvasButton } = installClearCanvas(canvasElement);

    // const ResizeDialog = installResizeDialog();

    const App = () => (
        <Skeleton 
            Display={Display}
            ResizeDialog={() => null}
            ExportCanvasButton={ExportCanvasButton}
            ClearCanvasButton={ClearCanvasButton}
            ColorPicker={() => null}
            EraserButton={EraserButton}
            PaintbrushButton={PaintbrushButton}
            ColorPickerButton={ColorPickerButton}
        />
    );

    return {
        App,
    };
}
