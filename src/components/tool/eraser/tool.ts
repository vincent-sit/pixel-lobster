import { line } from '../../../base/line';
import { EraseAction } from './action';
import { Action } from '../../operation-history/type';
import { Point } from '../types';

export class EraserTool {
    readonly type = 'eraser';
    private prevPoint?: Point;
    private points : Point[];

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly addToHistory : (operation : Action) => void
    ) {
        this.points = [];
    }

    down(x: number, y: number) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(x, y, 1, 1);
        this.prevPoint = {x, y};
        this.points.push({x : x, y: y});
    }

    move(x: number, y: number) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx || !this.prevPoint) return;

        const newPoints = line(
            x,
            y,
            this.prevPoint.x,
            this.prevPoint.y,
            (px: number, py: number) => {
                ctx.clearRect(px, py, 1, 1);
            }
        );
        this.points.push(...newPoints);
        this.prevPoint = {x, y};
    }
    
    up(x: number, y: number) {
        const canvasSnapshot = this.canvas.toDataURL();
        const paintOperation = new EraseAction(canvasSnapshot, this.points);
        this.addToHistory(paintOperation);
    }
}
