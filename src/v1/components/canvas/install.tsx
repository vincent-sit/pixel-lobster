import React from 'react';
import { Canvas as InternalCanvas } from './canvas';
import { useSnapshot } from 'valtio';
import { createCanvasState } from './state';
import { ZoomState } from '../zoom/state';

export function installCanvas(
    zoomState : ZoomState,
    draw : (e : React.PointerEvent<HTMLDivElement>, color : string, zoomFactor : number, canvas : HTMLCanvasElement) => void,
    erase : (e : React.PointerEvent<HTMLDivElement>, zoomFactor : number, canvas : HTMLCanvasElement) => void
) {
    const canvasState = createCanvasState();
    const canvas = document.createElement('canvas');
    canvas.width = canvasState.width;
    canvas.height = canvasState.height;
    canvas.style.imageRendering = 'pixelated';

    const Canvas = () => {
        const canvasSnapshot = useSnapshot(canvasState);
        const zoomSnapshot = useSnapshot(zoomState);

        return <InternalCanvas 
            canvas={canvas}
            zoomFactor={zoomSnapshot.zoomFactor}
            width={canvasSnapshot.width}
            height={canvasSnapshot.height}
            draw={draw}
            erase={erase}
        />;
    };

    return {
        Canvas,
        canvasElement : canvas
    };
}
