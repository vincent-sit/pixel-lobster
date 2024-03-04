import React from 'react';
import { useSnapshot } from 'valtio';
import { ZoomState } from '../zoom/state';
import { Display as InternalDisplay } from './display';

export function installDisplay(
    zoomState : ZoomState, 
    updateZoomFactor : (newZoomFactor : number) => void, 
    Canvas : React.ComponentType
) {
    const Display = () => {
        const snapshot = useSnapshot(zoomState);
        
        function onWheel(e : React.WheelEvent) {
            const scrollDistance = e.deltaY < 0 ? zoomState.scrollSpeed : -zoomState.scrollSpeed;
            const newZoomFactor = zoomState.zoomFactor + scrollDistance > 0.1 ? zoomState.zoomFactor + scrollDistance : 0.1;
            updateZoomFactor(newZoomFactor);
        }

        return <InternalDisplay
            zoomFactor={snapshot.zoomFactor}
            onWheel={onWheel}
            Canvas={Canvas}
        />;
    };

    return {
        Display
    };
}
