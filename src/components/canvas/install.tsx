import { CanvasPresenter } from './presenter';
import { createCanvasState } from './state';

export function installCanvas() {
    const state = createCanvasState();
    const presenter = new CanvasPresenter();

    const canvas = document.createElement('canvas');
    canvas.width = state.width;
    canvas.height = state.height;
    canvas.style.imageRendering = 'pixelated';
    canvas.style.display = 'block';

    const getCanvasSize = () => ({ width: state.width, height: state.height });
    const resize = (newWidth: number, newHeight: number) =>
        presenter.resize(state, canvas, newWidth, newHeight);

    return {
        canvas,
        getCanvasSize,
        resize,
    };
}
