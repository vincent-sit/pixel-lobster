import { ToolManagementState } from '../tool-management/state';

export class ColorPickerPresenter {
    pick(e : React.PointerEvent<HTMLDivElement>, color : string, zoomFactor : number, canvas : HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        const dataAtPixel = ctx.getImageData(Math.floor((e.clientX - rect.x) / zoomFactor), Math.floor((e.clientY - rect.y) / zoomFactor), 1, 1).data;
        const rgbaString = `rgba(${dataAtPixel[0]},${dataAtPixel[1]},${dataAtPixel[2]},${dataAtPixel[3]})`;
        if (dataAtPixel[3] === 0) return;
        // return color to update state
    }

    changeTool(state : ToolManagementState) {
        state.tool = 'colorpicker';
    }
}
