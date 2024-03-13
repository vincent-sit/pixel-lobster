import React from 'react';
import { Skeleton } from './components/skeleton/skeleton';
import { installDisplay } from './components/display/install';
import { installCanvasProxy } from './components/canvas-proxy/install';
import { installZoom } from './components/zoom/install';
import { installExport } from './components/export/install';
import { installClearCanvas } from './components/clear-canvas/install';
import { installTool } from './components/tool/install';
import { installCanvas } from './components/canvas/install';
import { installColorPicker } from './components/color-picker/install';
import { installColorHistory } from './components/color-history/install';
import { installResize } from './components/resize/install';

export function installApp() {
    const { getZoomFactor, zoom, ZoomArea } = installZoom();
    const { canvas, getCanvasSize, resize } = installCanvas();
    const { ColorPicker, getColor, setColor } = installColorPicker();
    const { ColorHistory, addToColorHistory } = installColorHistory(setColor);
    const { ToolBar, getTool } = installTool({ canvas, getColor, setColor, addToColorHistory });
    const { CanvasProxy } = installCanvasProxy(getZoomFactor, getColor, canvas, getTool);
    const { Display } = installDisplay(zoom, ZoomArea, CanvasProxy);
    const { ExportButton } = installExport(canvas);
    const { ClearCanvasButton } = installClearCanvas(canvas);
    const { ResizeButton } = installResize(getCanvasSize, resize);

    const App = () => (
        <Skeleton 
            Display={Display}
            ExportButton={ExportButton}
            ClearButton={ClearCanvasButton}
            ResizeButton={ResizeButton}
            ColorPicker={ColorPicker}
            ToolBar={ToolBar}
            ColorHistory={ColorHistory}
        />
    );

    return {
        App,
    };
}
