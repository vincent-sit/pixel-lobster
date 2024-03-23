import { Action } from '../../operation-history/type';
import { PaintBrushTool } from './tool';
import Color from 'colorjs.io';

export function installPaintBrush(
    canvas: HTMLCanvasElement,
    getColor: () => Color,
    addToColorHistory: (color: Color) => void,
    addToHistory : (operation : Action) => void
) {
    const tool = new PaintBrushTool(canvas, getColor, addToColorHistory, addToHistory);

    return {
        tool,
    };
}
