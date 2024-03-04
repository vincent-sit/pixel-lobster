export class ExportCanvasPresenter {
    
    export(canvas : HTMLCanvasElement) {
        const canvasUrl = canvas.toDataURL();
        const createEl = document.createElement('a');
        createEl.href = canvasUrl;
            
        createEl.download = 'pixel-lobster-art';
        createEl.click();
        createEl.remove();
    }
}
