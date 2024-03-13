import { EraserTool } from './tool';

export function installEraser(
    canvas : HTMLCanvasElement
) {
    const tool = new EraserTool(canvas);

    return {
        tool,
    };
}
