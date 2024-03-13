import Color from 'colorjs.io';
import { BaseTool } from '../types';

export class PaintBrushTool implements BaseTool {
    readonly type = 'paint-brush';

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly getColor: () => Color,
        private readonly addToColorHistory : (color : Color) => void,
    ) {}

    down(x : number, y : number) {
        const context = this.canvas.getContext('2d');
        if (!context) return;
        context.fillStyle = this.getColor().to('srgb').toString();
        context.fillRect(x, y, 1, 1);
        this.addToColorHistory(this.getColor());
    }

    move(x : number, y : number) {
        const context = this.canvas.getContext('2d');
        if (!context) return;
        context.fillStyle = this.getColor().to('srgb').toString();
        context.fillRect(x, y, 1, 1);
    }
}
