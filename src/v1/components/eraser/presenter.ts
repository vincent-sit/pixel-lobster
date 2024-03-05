export class EraserPresenter {
    erase(e : React.PointerEvent<HTMLDivElement>, zoomFactor : number, canvas : HTMLCanvasElement) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(Math.floor((e.clientX - rect.x) / zoomFactor), Math.floor((e.clientY - rect.y) / zoomFactor), 1, 1);
    }
}
