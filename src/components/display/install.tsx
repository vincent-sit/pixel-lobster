import React from 'react';
import { Display as InternalDisplay } from './display';
import { clamp } from '../../base/math';

export function installDisplay(
    zoom: (scale: number) => void,
    ZoomArea: React.ComponentType<{ children: React.ReactNode }>,
    Canvas: React.ComponentType
) {
    const Display = () => {
        function onWheel(e: React.WheelEvent) {
            zoom(clamp(-e.deltaY, -1, 1));
        }

        return (
            <InternalDisplay onWheel={onWheel}>
                <ZoomArea>
                    <Canvas />
                </ZoomArea>
            </InternalDisplay>
        );
    };

    return {
        Display,
    };
}
