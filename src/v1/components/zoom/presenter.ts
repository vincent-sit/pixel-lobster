import { ZoomState } from './state';

const MIN_ZOOM_FACTOR = 0.1;

export class ZoomPresenter {
    constructor() {
    }

    zoom(state : ZoomState, scale : number) {
        state.zoomFactor = Math.max(MIN_ZOOM_FACTOR, state.zoomFactor + (state.scrollSpeed * scale));
    }
}
