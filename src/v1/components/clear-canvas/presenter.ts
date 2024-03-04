export class ClearCanvasPresenter {
    clear(canvas : HTMLCanvasElement) {
        const context = canvas.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height);
    }
}
