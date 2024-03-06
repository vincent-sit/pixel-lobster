import { ToolState } from '../tool/state';

export class EraserPresenter {
    constructor(private readonly canvas : HTMLCanvasElement) {
        this.canvas = canvas;
    }

    erase(x : number, y : number) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(x, y, 1, 1);
    }

    changeTool(state : ToolState) {
        state.tool = 'eraser';
    }
}
