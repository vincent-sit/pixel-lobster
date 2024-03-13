import Color from 'colorjs.io';
import { EyeDropperTool } from './tool';

export function installEyeDropper(
    canvas : HTMLCanvasElement,
    setColor : (newColor : Color) => void
) {
    const tool = new EyeDropperTool(canvas, setColor);

    return {
        tool
    };
}
