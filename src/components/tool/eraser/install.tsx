import { Action } from '../../operation-history/type';
import { EraserTool } from './tool';

export function installEraser(
    canvas: HTMLCanvasElement, 
    addToHistory : (operation : Action) => void
) {
    const tool = new EraserTool(canvas, addToHistory);

    return {
        tool,
    };
}
