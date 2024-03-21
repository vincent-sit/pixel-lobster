import { Action } from "../../operation-history/type";
import { Point } from "../types";

export class EraseAction implements Action {
    constructor(
        private readonly canvasImage : string,
        private readonly points : Point[]
    ) {}

    undo(canvas : HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        var image = new Image();
        image.src = this.canvasImage;
        image.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        };
    }

    redo(canvas : HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        if (!context) return;
        this.points.forEach(point => {
            context.clearRect(point.x, point.y, 1, 1);
        })
    }
}