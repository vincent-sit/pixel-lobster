export class ResizePresenter {
    constructor(private readonly canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    canvasResize(width: number, height: number) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        const imgData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = width;
        this.canvas.height = height;
        ctx.putImageData(imgData, 0, 0);
    }
}
