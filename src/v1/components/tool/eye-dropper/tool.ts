import Color from 'colorjs.io';
import { BaseTool } from '../types';

export class EyeDropperTool implements BaseTool {
    readonly type = 'eye-dropper';

    constructor(
        private readonly canvas : HTMLCanvasElement,
        private readonly setColor : (newColor : Color) => void
    ) {}

    down(x : number, y : number) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) return;
        const dataAtPixel = ctx.getImageData(x, y, 1, 1).data;
        const rgbaString = `rgba(${dataAtPixel[0]},${dataAtPixel[1]},${dataAtPixel[2]},${dataAtPixel[3]})`;
        if (dataAtPixel[3] === 0) return;
        this.setColor(new Color(rgbaString));
    }

    move(x : number, y : number) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) return;
        const dataAtPixel = ctx.getImageData(x, y, 1, 1).data;
        const rgbaString = `rgba(${dataAtPixel[0]},${dataAtPixel[1]},${dataAtPixel[2]},${dataAtPixel[3]})`;
        if (dataAtPixel[3] === 0) return;
        this.setColor(new Color(rgbaString));
    }
}
