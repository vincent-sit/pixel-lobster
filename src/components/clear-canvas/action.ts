import { Action } from "../operation-history/type";

export class ClearAction implements Action {
    readonly type = 'clear';
    canvasImage: string;

    constructor(canvasImage : string) {
        this.canvasImage = canvasImage;
    }

    undo(canvas : HTMLCanvasElement) {
        this.clear(canvas);
    }

    redo(canvas : HTMLCanvasElement) {
        this.clear(canvas);
    }

    private clear(canvas : HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}