import Color from 'colorjs.io';
import { BaseTool } from '../types';

export class PaintBrushTool implements BaseTool {
    readonly type = 'paint-brush';
    private points?: [number, number, number, number];

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly getColor: () => Color,
        private readonly addToColorHistory: (color: Color) => void
    ) {}

    down(x: number, y: number) {
        const context = this.canvas.getContext('2d');
        if (!context) return;
        context.fillStyle = this.getColor().to('srgb').toString();
        context.fillRect(x, y, 1, 1);
        this.points = [x, y, x, y];
        this.addToColorHistory(this.getColor());
    }

    move(x: number, y: number) {
        const context = this.canvas.getContext('2d');
        if (!context || !this.points) return;

        // Bresenham's line algorithm
        // Adapted from https://saturncloud.io/blog/bresenham-line-algorithm-a-powerful-tool-for-efficient-line-drawing/                                                                 
        let x1 = this.points[2];
        let y1 = this.points[3];
        let x2 = x;
        let y2 = y;
        this.points = [x1, y1, x2, y2];
        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);
        const slope = dy > dx;

        if (slope) {
            let t = x1;
            x1 = y1;
            y1 = t;
            t = x2;
            x2 = y2;
            y2 = t;
        }

        if (x1 > x2) {
            let t = x1;
            x1 = x2;
            x2 = t;
            t = y1;
            y1 = y2;
            y2 = t;
        }

        dx = Math.abs(x2 - x1);
        dy = Math.abs(y2 - y1);
        let error = dx; // 2
        let drawY = y1;
        const ystep = y1 < y2 ? 1 : -1;
        context.fillStyle = this.getColor().to('srgb').toString();

        for (let drawX = x1; drawX < x2 + 1; drawX++) {
            const coord = slope ? [drawY, drawX] : [drawX, drawY];
            context.fillRect(coord[0], coord[1], 1, 1);
            error -= dy;
            if (error < 0) {
                drawY += ystep;
                error += dx;
            }
        }
    }

    up() {
        this.points = undefined;
    }
}
