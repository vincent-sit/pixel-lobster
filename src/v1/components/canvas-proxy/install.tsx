import React from 'react';
import { CanvasProxy as InternalCanvas } from './canvas-proxy';
import { useSnapshot } from 'valtio';
import { ZoomState } from '../zoom/state';
import { ToolState } from '../tool/state';
import { CanvasState } from '../canvas/state';

export function installCanvasProxy(
    zoomState : ZoomState,
    draw : (x : number, y : number, color : string) => void,
    erase : (x : number, y : number) => void,
    toolState : ToolState,
    canvasState : CanvasState,
    canvas : HTMLCanvasElement
) {
    const CanvasProxy = () => {
        const canvasSnapshot = useSnapshot(canvasState);
        const zoomSnapshot = useSnapshot(zoomState);
        const toolSnapshot = useSnapshot(toolState);

        return <InternalCanvas 
            canvas={canvas}
            zoomFactor={zoomSnapshot.zoomFactor}
            width={canvasSnapshot.width}
            height={canvasSnapshot.height}
            draw={draw}
            erase={erase}
            tool={toolSnapshot.tool}
        />;
    };

    return {
        CanvasProxy
    };
}
