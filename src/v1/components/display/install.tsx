import React from 'react';
import { useSnapshot } from 'valtio';
import { DisplayState } from './model';
import { DisplayPresenter } from './presenter';
import { Display as InternalDisplay } from './display';

export function installDisplay(Canvas : React.ComponentType) {
    const display = document.createElement('div');
    display.style.width = '100%';
    display.style.height = '100%';
    display.style.position = 'absolute';
    const presenter = new DisplayPresenter(display);

    const Display = () => {
        const snapshot = useSnapshot(DisplayState);
        
        function onScroll(e : WheelEvent) {
            const newZoomFactor = presenter.updateZoomFactor(e, snapshot.store.scrollSpeed, snapshot.store.zoomFactor);
            if (!newZoomFactor) return;
            snapshot.updateZoomFactor(newZoomFactor);
        }

        return <InternalDisplay
            zoomFactor={snapshot.store.zoomFactor}
            onScroll={onScroll}
            Canvas={Canvas}
            Display={display}
        />;
    };

    return {
        Display
    };
}
