import Color from 'colorjs.io';
import { ToolState } from '../tool/state';

export class EyeDropperPresenter {
    pick(x : number, y : number, canvas : HTMLCanvasElement, updateColor : (newColor : Color) => void) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const dataAtPixel = ctx.getImageData(x, y, 1, 1).data;
        const rgbaString = `rgba(${dataAtPixel[0]},${dataAtPixel[1]},${dataAtPixel[2]},${dataAtPixel[3]})`;
        if (dataAtPixel[3] === 0) return;
        updateColor(new Color(rgbaString));
    }

    changeTool(state : ToolState) {
        state.tool = 'colorpicker';
    }
}
