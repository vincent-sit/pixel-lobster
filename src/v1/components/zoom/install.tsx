import React from 'react';
import { createZoomState } from './state';
import { ZoomPresenter } from './presenter';
import { ZoomArea as InternalZoomArea } from './zoom-area';
import { useSnapshot } from 'valtio';

export function installZoom() {
    const state = createZoomState();
    const presenter = new ZoomPresenter();

    const getZoomFactor = () => state.zoomFactor;

    const zoom = (scale : number) => presenter.zoom(state, scale);

    const ZoomArea = ({ children } : { children : React.ReactNode}) => {
        const { zoomFactor } = useSnapshot(state);
        return <InternalZoomArea zoomFactor={zoomFactor}>{children}</InternalZoomArea>;
    };

    return {
        getZoomFactor,
        zoom,
        ZoomArea,
    };
}
