import { Operation } from '../../operation-history/type';
import { EraserTool } from './tool';

export function installEraser(
    canvas: HTMLCanvasElement, 
    addToHistory : (operation : Operation) => void
) {
    const tool = new EraserTool(canvas, addToHistory);

    return {
        tool,
    };
}
