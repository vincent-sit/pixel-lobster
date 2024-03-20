import { Operation } from "../type";

export class EraseOperation implements Operation {
    readonly type = 'erase';
    canvasImage: string;

    constructor(canvasImage : string) {
        this.canvasImage = canvasImage;
    }

    operate(canvas : HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        var image = new Image();
        image.src = this.canvasImage;
        image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        };
    }
}