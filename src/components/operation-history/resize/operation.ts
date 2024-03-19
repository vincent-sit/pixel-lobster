import { Operation } from "../type";

export class ResizeOperation implements Operation {
    readonly type = 'resize';
    canvasImage: string;
    canvasHeight: number;
    canvasWidth: number;

    constructor(canvasImage : string, canvasWidth : number, canvasHeight : number) {
        this.canvasImage = canvasImage;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    operate(canvas : HTMLCanvasElement) {
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        var prevState = new Image();
        prevState.src = this.canvasImage;
        ctx.drawImage(prevState, 0, 0);
    }
}