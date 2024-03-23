import Color from "colorjs.io/types/src";
import { Action } from "../../operation-history/type";
import { Point } from "../types";

export class PaintAction implements Action {
    constructor(
        private readonly canvasImage : string, 
        private readonly color : Color, 
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
        context.fillStyle = this.color.to('srgb').toString();
        this.points.forEach(point => {
            context.fillRect(point.x, point.y, 1, 1);
        })
    }
}