import { createCanvasState } from './state';

export function installCanvas() {
    const canvasState = createCanvasState();
    
    const canvas = document.createElement('canvas');
    canvas.width = canvasState.width;
    canvas.height = canvasState.height;
    canvas.style.imageRendering = 'pixelated';

    return {
        canvas,
        canvasState
    };
}
