import { Operation } from "../type";

export class PaintOperation implements Operation {
    readonly type = 'paint';
    canvasImage: string;

    constructor(canvasImage : string) {
        this.canvasImage = canvasImage;
    }

    operate(canvas : HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        var prevState = new Image();
        prevState.src = this.canvasImage;
        ctx.drawImage(prevState, 0, 0);
    }
}