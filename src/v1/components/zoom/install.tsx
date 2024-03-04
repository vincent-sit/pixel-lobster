import { createZoomState } from './state';
import { ZoomPresenter } from './presenter';

export function installZoom() {
    const state = createZoomState();
    const presenter = new ZoomPresenter();

    const updateZoomFactor = (newZoomFactor : number) => presenter.updateZoomFactor(state, newZoomFactor);

    return {
        updateZoomFactor,
        state
    };
}
