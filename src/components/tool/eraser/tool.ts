import { line } from '../../../base/line';
import { EraseOperation } from '../../operation-history/erase/operation';
import { Operation } from '../../operation-history/type';

export class EraserTool {
    readonly type = 'eraser';
    private prevPoint?: [number, number];

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly addToHistory : (operation : Operation) => void
    ) {
        this.canvas = canvas;
    }

    down(x: number, y: number) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(x, y, 1, 1);
        this.prevPoint = [x, y];
    }

    move(x: number, y: number) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx || !this.prevPoint) return;

        line(
            x,
            y,
            this.prevPoint[0],
            this.prevPoint[1],
            (px: number, py: number) => {
                ctx.clearRect(px, py, 1, 1);
            }
        );
        this.prevPoint = [x, y];
    }
    
    up(x: number, y: number) {
        const canvasSnapshot = this.canvas.toDataURL();
        const paintOperation = new EraseOperation(canvasSnapshot);
        this.addToHistory(paintOperation);
    }
}
