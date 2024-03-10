import { CanvasState } from '../canvas/state';

export class ResizeDialogPresenter {
    resize(state : CanvasState, newHeight : number, newWidth : number) {
        state.height = newHeight;
        state.width = newWidth;
    }
}
