import { createZoomState } from './state';
import { ZoomPresenter } from './presenter';

export function installZoom() {
    const state = createZoomState();
    const presenter = new ZoomPresenter();

    const zoom = (scale : number) => presenter.zoom(state, scale);

    return {
        zoom,
        state
    };
}
