import { createCanvasState } from './state';

export function installCanvas() {
    const state = createCanvasState();
    
    const canvas = document.createElement('canvas');
    canvas.width = state.width;
    canvas.height = state.height;
    canvas.style.imageRendering = 'pixelated';

    return {
        canvas,
        state
    };
}
