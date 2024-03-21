import Color from 'colorjs.io';
import { BaseTool, Point } from '../types';
import { line } from '../../../base/line';
import { Action } from '../../operation-history/type';
import { PaintAction } from './action';

export class PaintBrushTool implements BaseTool {
    readonly type = 'paint-brush';
    private prevPoint?: Point;
    private points : Point[];

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly getColor: () => Color,
        private readonly addToColorHistory: (color: Color) => void,
        private readonly addToHistory : (operation : Action) => void
    ) {
        this.points = [];
    }

    down(x: number, y: number) {
        const context = this.canvas.getContext('2d');
        if (!context) return;
        context.fillStyle = this.getColor().to('srgb').toString();
        context.fillRect(x, y, 1, 1);
        this.prevPoint = {x, y};
        this.addToColorHistory(this.getColor());
        this.points.push({x : x, y: y});
    }

    move(x: number, y: number) {
        const context = this.canvas.getContext('2d');
        if (!context || !this.prevPoint) return;

        context.fillStyle = this.getColor().to('srgb').toString();
        const newPoints = line(
            x,
            y,
            this.prevPoint.x,
            this.prevPoint.y,
            (px: number, py: number) => {
                context.fillRect(px, py, 1, 1);
            }
        );
        this.points.push(...newPoints);
        this.prevPoint = {x, y};
    }

    up(x: number, y: number) {
        // add points to the operation so it can remember to draw it and then clear it
        const canvasSnapshot = this.canvas.toDataURL();
        const paintOperation = new PaintAction(canvasSnapshot, this.getColor(), this.points);
        this.addToHistory(paintOperation);
        this.points = [];
    }
}
