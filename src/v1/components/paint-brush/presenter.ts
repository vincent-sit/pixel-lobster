import { ToolManagementState } from '../tool-management/state';

export class PaintBrushPresenter {
    draw(e : React.PointerEvent<HTMLDivElement>, color : string, zoomFactor : number, canvas : HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        if (!context) return;
        context.fillStyle = color;
        context.fillRect(Math.floor((e.clientX - rect.x) / zoomFactor), Math.floor((e.clientY - rect.y) / zoomFactor), 1, 1);
    }

    changeTool(state : ToolManagementState) {
        state.tool = 'paintbrush';
    }
}
