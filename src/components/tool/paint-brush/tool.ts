import Color from 'colorjs.io';
import { BaseTool } from '../types';
import { line } from '../../../base/line';
import { Operation } from '../../operation-history/type';
import { PaintOperation } from '../../operation-history/paint/operation';

export class PaintBrushTool implements BaseTool {
    readonly type = 'paint-brush';
    private prevPoint?: [number, number];

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly getColor: () => Color,
        private readonly addToColorHistory: (color: Color) => void,
        private readonly addToHistory : (operation : Operation) => void
    ) {}

    down(x: number, y: number) {
        const context = this.canvas.getContext('2d');
        if (!context) return;
        context.fillStyle = this.getColor().to('srgb').toString();
        context.fillRect(x, y, 1, 1);
        this.prevPoint = [x, y];
        this.addToColorHistory(this.getColor());
    }

    move(x: number, y: number) {
        const context = this.canvas.getContext('2d');
        if (!context || !this.prevPoint) return;

        context.fillStyle = this.getColor().to('srgb').toString();
        line(
            x,
            y,
            this.prevPoint[0],
            this.prevPoint[1],
            (px: number, py: number) => {
                context.fillRect(px, py, 1, 1);
            }
        );
        this.prevPoint = [x, y];
        this.canvas.toDataURL();
    }

    up(x: number, y: number) {
        const canvasSnapshot = this.canvas.toDataURL();
        const paintOperation = new PaintOperation(canvasSnapshot);
        this.addToHistory(paintOperation);
    }
}
