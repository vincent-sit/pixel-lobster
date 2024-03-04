import {ZoomState} from './state';

export class ZoomPresenter {
    constructor() {
    }

    updateZoomFactor(state : ZoomState, newZoomFactor : number) {
        state.zoomFactor = newZoomFactor;
    }
}
