import React from 'react';
import { proxy, useSnapshot } from 'valtio';
import { Canvas as InternalCanvas } from './canvas';
import { CanvasStore } from './store';
import { CanvasPresenter } from './presenter';
import { DisplayState } from '../display/model';
import Color from 'colorjs.io';

export function installCanvas() {
    const store = proxy(new CanvasStore());

    const canvas = document.createElement('canvas');
    canvas.width = store.width;
    canvas.height = store.height;
    canvas.style.imageRendering = 'pixelated';
    
    const marker = document.createElement('span');
    marker.style.width = '1px';
    marker.style.height = '1px';
    marker.style.position = 'absolute';
    marker.style.visibility = 'hidden';
    marker.style.backgroundColor = 'white';
    marker.style.top = '0';
    marker.style.left = '0';
    
    const presenter = new CanvasPresenter(canvas, marker);

    const Canvas = () => {
        const snapshot = useSnapshot(store);

        return <InternalCanvas 
            canvas={canvas}
            marker={marker}
            width={snapshot.width}
            height={snapshot.height}
            onMouseMove={(e) => presenter.onMouseMove(e, new Color('white'), DisplayState.store.zoomFactor)}
            onMouseLeave={() => presenter.onMouseLeave()}
        />;
    };

    return {
        Canvas,
        store,
    };
}
