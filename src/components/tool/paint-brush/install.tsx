import { Operation } from '../../operation-history/type';
import { PaintBrushTool } from './tool';
import Color from 'colorjs.io';

export function installPaintBrush(
    canvas: HTMLCanvasElement,
    getColor: () => Color,
    addToColorHistory: (color: Color) => void,
    addToHistory : (operation : Operation) => void
) {
    const tool = new PaintBrushTool(canvas, getColor, addToColorHistory, addToHistory);

    return {
        tool,
    };
}
