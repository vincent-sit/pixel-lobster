import { Action } from "../operation-history/type";

export class ResizeAction implements Action {
    canvasImage: string;
    canvasHeight: number;
    canvasWidth: number;

    constructor(canvasImage : string, canvasWidth : number, canvasHeight : number) {
        this.canvasImage = canvasImage;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    undo(canvas : HTMLCanvasElement) {
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        var prevState = new Image();
        prevState.src = this.canvasImage;
        ctx.drawImage(prevState, 0, 0);
    }

    redo(canvas: HTMLCanvasElement) {}
}