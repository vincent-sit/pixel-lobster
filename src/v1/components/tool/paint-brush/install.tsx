import { PaintBrushTool } from './tool';
import Color from 'colorjs.io';

export function installPaintBrush(
    canvas: HTMLCanvasElement,
    getColor: () => Color,
    addToColorHistory: (color: Color) => void
) {
    const tool = new PaintBrushTool(canvas, getColor, addToColorHistory);

    return {
        tool,
    };
}
