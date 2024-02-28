import React from 'react';
import { proxy, useSnapshot } from 'valtio';
import { Canvas as InternalCanvas } from './canvas';
import { CanvasStore } from './store';

export function installCanvas() {
    const store = proxy(new CanvasStore());
    const canvas = document.createElement('canvas');
    canvas.width = store.width;
    canvas.height = store.height;

    const Canvas = () => {
        const snapshot = useSnapshot(store);
        return <InternalCanvas canvas={canvas} width={snapshot.width} height={snapshot.height}/>;
    };

    return {
        Canvas,
        store,
    };
}
