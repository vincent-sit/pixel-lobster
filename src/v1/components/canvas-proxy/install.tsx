import React from 'react';
import { CanvasProxy as InternalCanvasProxy } from './canvas-proxy';
import { useSnapshot } from 'valtio';
import { ZoomState } from '../zoom/state';
import { ToolState } from '../tool/state';
import { ColorState } from '../color/state';
import Color from 'colorjs.io';

export function installCanvasProxy(
    zoomState : ZoomState,
    draw : (x : number, y : number, color : string) => void,
    erase : (x : number, y : number) => void,
    pick : (x : number, y : number, canvas : HTMLCanvasElement) => void,
    addToColorHistory : (newColor : Color) => void,
    toolState : ToolState,
    colorState : ColorState,
    canvas : HTMLCanvasElement
) {
    const CanvasProxy = () => {
        const zoomSnapshot = useSnapshot(zoomState);
        const toolSnapshot = useSnapshot(toolState);
        const colorSnapshot = useSnapshot(colorState);

        return <InternalCanvasProxy
            canvas={canvas}
            zoomFactor={zoomSnapshot.zoomFactor}
            color={colorSnapshot.color}
            draw={draw}
            erase={erase}
            pick={pick}
            addToColorHistory={addToColorHistory}
            tool={toolSnapshot.tool}
        />;
    };

    return {
        CanvasProxy
    };
}
