export class EraserTool {
    readonly type = 'eraser';

    constructor(private readonly canvas : HTMLCanvasElement) {
        this.canvas = canvas;
    }

    down(x : number, y : number) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(x, y, 1, 1);
    }

    move(x : number, y : number) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(x, y, 1, 1);
    }
}
