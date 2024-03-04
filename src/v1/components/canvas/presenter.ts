import Color from 'colorjs.io';

export class CanvasPresenter {
    constructor(
        private readonly canvas : HTMLCanvasElement, 
        // private readonly marker : HTMLSpanElement
    ) {
        this.canvas = canvas;
        // this.marker = marker;
    }

    // private toggleMarkerVisibility(isVisible : boolean) {
    //     this.marker.style.visibility = isVisible ? 'visible' : 'hidden';
    // }

    // private trackMarkerMovement(pointerX : number, pointerY : number, zoomFactor : number) {
    //     const rect = this.canvas.getBoundingClientRect();
    //     this.toggleMarkerVisibility(true);
    //     this.marker.style.top = `${Math.floor((pointerY - rect.y) / zoomFactor)}px`;
    //     this.marker.style.left = `${Math.floor((pointerX - rect.x) / zoomFactor)}px`;
    // }

    private trackMouseDrag(
        color : Color,
        pointerX : number,
        pointerY : number,
        zoomFactor : number
    ) {
        const canvasCtx = this.canvas.getContext('2d');
        const rect = this.canvas.getBoundingClientRect();
        if (!canvasCtx) return;
        const currentColorString = color.to('srgb').toString();
        canvasCtx.fillStyle = currentColorString;
        canvasCtx.fillRect(Math.floor((pointerX - rect.x) / zoomFactor), Math.floor((pointerY - rect.y) / zoomFactor), 1, 1);
    }

    onMouseMove(e : PointerEvent, color : Color, zoomFactor : number) {
        // this.toggleMarkerVisibility(true);
        // this.trackMarkerMovement(e.clientX, e.clientY, zoomFactor);
        if (e.pressure > 0) {
            this.trackMouseDrag(color, e.clientX, e.clientY, zoomFactor);
        }
    }

    // canvasResize(width: number, height: number) {
    //     const ctx = this.canvas.getContext('2d');
    //     if (!ctx) {
    //         return;
    //     }
    //     const imgData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    //     this.canvas.width = width;
    //     this.canvas.height = height;
    //     ctx.putImageData(imgData, 0, 0);
    // }
}
