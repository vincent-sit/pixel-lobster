import React from 'react';
import { Skeleton } from './components/skeleton/skeleton';
import { installDisplay } from './components/display/install';
import { installCanvasProxy } from './components/canvas-proxy/install';
import { installZoom } from './components/zoom/install';
import { installExport } from './components/export/install';
import { installClearCanvas } from './components/clear-canvas/install';
import { installPaintBrush } from './components/paint-brush/install';
import { installEraser } from './components/eraser/install';
import { installTool } from './components/tool/install';
import { installEyeDropper } from './components/eye-dropper/install';
import { installCanvas } from './components/canvas/install';
import { installColorPicker } from './components/color-picker/install';
import { installColor } from './components/color/install';
import { installColorHistory } from './components/color-history/install';
import { installResize } from './components/resize/install';

export function installApp() {
    const { getZoomFactor, zoom, ZoomArea } = installZoom();
    const { state : toolState, changeTool } = installTool();
    const { state : colorState, updateColor, addToColorHistory } = installColor();
    const { state : canvasState, canvas, resize } = installCanvas();
    const { ColorPicker } = installColorPicker(colorState, updateColor);
    const { ColorHistory } = installColorHistory(colorState, updateColor);
    const { draw, PaintbrushButton } = installPaintBrush(toolState, changeTool, canvas);
    const { erase, EraserButton } = installEraser(toolState, changeTool, canvas);
    const { pick, EyeDropperButton } = installEyeDropper(toolState, changeTool, updateColor);
    const { CanvasProxy } = installCanvasProxy(draw, erase, pick, addToColorHistory, getZoomFactor, toolState, colorState, canvas);
    const { Display } = installDisplay(zoom, ZoomArea, CanvasProxy);
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
            EyeDropperButton={EyeDropperButton}
            ColorHistory={ColorHistory}
        />
    );

    return {
        App,
    };
}
