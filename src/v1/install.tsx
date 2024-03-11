import React from 'react';
import { Skeleton } from './components/skeleton/skeleton';
import { installDisplay } from './components/display/install';
import { installCanvasProxy } from './components/canvas-proxy/install.tsx';
import { installZoom } from './components/zoom/install';
import { installExport } from './components/export/install.tsx';
import { installClearCanvas } from './components/clear-canvas/install.tsx';
import { installPaintBrush } from './components/paint-brush/install';
import { installEraser } from './components/eraser/install.tsx';
import { installTool } from './components/tool/install.ts';
import { installEyeDropper } from './components/eye-dropper/install.tsx';
import { installCanvas } from './components/canvas/install.tsx';
import { installColorPicker } from './components/color-picker/install.tsx';
import { installColor } from './components/color/install.tsx';
import { installColorHistory } from './components/color-history/install.tsx';
import { installResize } from './components/resize/install.tsx';

export function installApp() {
    const { state : zoomState, updateZoomFactor } = installZoom();
    const { state : toolState, changeTool } = installTool();
    const { state : colorState, updateColor, addToColorHistory } = installColor();
    const { state : canvasState, canvas, resize } = installCanvas();
    const { ColorPicker } = installColorPicker(colorState, updateColor);
    const { ColorHistory } = installColorHistory(colorState, updateColor);
    const { draw, PaintbrushButton } = installPaintBrush(toolState, changeTool, canvas);
    const { erase, EraserButton } = installEraser(toolState, changeTool, canvas);
    const { pick, ColorPickerButton } = installEyeDropper(toolState, changeTool, updateColor);
    const { CanvasProxy } = installCanvasProxy(zoomState, draw, erase, pick, addToColorHistory, toolState, canvasState, colorState, canvas);
    const { Display } = installDisplay(zoomState, updateZoomFactor, CanvasProxy);
    const { ExportButton } = installExport(canvas);
    const { ClearCanvasButton } = installClearCanvas(canvas);
    const { ResizeButton } = installResize(canvasState, resize);

    const App = () => (
        <Skeleton 
            Display={Display}
            ExportButton={ExportButton}
            ClearButton={ClearCanvasButton}
            ResizeButton={ResizeButton}
            ColorPicker={ColorPicker}
            EraserButton={EraserButton}
            PaintbrushButton={PaintbrushButton}
            ColorPickerButton={ColorPickerButton}
            ColorHistory={ColorHistory}
        />
    );

    return {
        App,
    };
}
