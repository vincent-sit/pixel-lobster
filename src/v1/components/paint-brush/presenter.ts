export class PaintBrushPresenter {
    constructor(private readonly canvas : HTMLCanvasElement) {
        this.canvas = canvas;
    }
    
    draw(x : number, y : number, color : string) {
        const context = this.canvas.getContext('2d');
        if (!context) return;
        context.fillStyle = color;
        context.fillRect(x, y, 1, 1);
    }
}
