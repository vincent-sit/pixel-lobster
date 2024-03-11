import { CanvasState } from './state';

export class CanvasPresenter {
    resize(
        state : CanvasState,
        canvas : HTMLCanvasElement,
        newWidth : number,
        newHeight : number
    ) {
        const currCtx = canvas.getContext('2d');
        if (!currCtx) return;
        const imgData = currCtx.getImageData(0, 0, canvas.width, canvas.height);
        state.width = newWidth;
        state.height = newHeight;
        canvas.width = newWidth;
        canvas.height = newHeight;
        currCtx.putImageData(imgData, 0, 0);
    }
}
