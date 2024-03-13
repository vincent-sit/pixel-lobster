import React from 'react';
import { Display as InternalDisplay } from './display';
import { clamp } from '../../utils/math';

export function installDisplay(
    zoom : (scale : number) => void, 
    Canvas : React.ComponentType
) {
    const Display = () => {
        function onWheel(e : React.WheelEvent) {
            zoom(clamp(-e.deltaY, -1, 1));
        }

        return <InternalDisplay
            onWheel={onWheel}
            Canvas={Canvas}
        />;
    };

    return {
        Display
    };
}
