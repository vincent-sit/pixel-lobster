import Color from 'colorjs.io';
import { ToolState } from '../tool/state';

export class EyeDropperPresenter {
    pick(e : React.PointerEvent<HTMLDivElement>, color : string, zoomFactor : number, canvas : HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        const dataAtPixel = ctx.getImageData(Math.floor((e.clientX - rect.x) / zoomFactor), Math.floor((e.clientY - rect.y) / zoomFactor), 1, 1).data;
        const rgbaString = `rgba(${dataAtPixel[0]},${dataAtPixel[1]},${dataAtPixel[2]},${dataAtPixel[3]})`;
        if (dataAtPixel[3] === 0) return;
        // return color to update state
    }

    changeTool(state : ToolState) {
        state.tool = 'colorpicker';
    }

    updateCanvasColor(canvas : HTMLCanvasElement, hue : number) {
        const currCtx = canvas.getContext('2d');
        if (!currCtx) return;
        
        const gradientH = currCtx.createLinearGradient(0, 0, currCtx.canvas.width, 0);
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, new Color('hsv', [hue, 100, 100]).to('srgb').toString());
        currCtx.fillStyle = gradientH;
        currCtx.fillRect(0, 0, currCtx.canvas.width, currCtx.canvas.height);

        const gradientV = currCtx.createLinearGradient(0, 0, 0, currCtx.canvas.height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, '#000');
        currCtx.fillStyle = gradientV;
        currCtx.fillRect(0, 0, currCtx.canvas.width, currCtx.canvas.height);
    }
}
