import React from 'react';
import { CanvasProxy as InternalCanvasProxy } from './canvas-proxy';
import Color from 'colorjs.io';
import { Tool } from '../tool/types';

export function installCanvasProxy(
    getZoomFactor: () => number,
    getColor: () => Color,
    canvas: HTMLCanvasElement,
    getTool: () => Tool
) {
    const CanvasProxy = () => {
        return (
            <InternalCanvasProxy
                canvas={canvas}
                getColor={getColor}
                getTool={getTool}
                getZoomFactor={getZoomFactor}
            />
        );
    };

    return {
        CanvasProxy,
    };
}
