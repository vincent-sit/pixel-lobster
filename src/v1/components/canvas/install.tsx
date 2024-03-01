import React , { useEffect }from 'react';
import { useSnapshot } from 'valtio';
import { Canvas as InternalCanvas } from './canvas';
import { CanvasPresenter } from './presenter';
import { DisplayState } from '../display/model';
import Color from 'colorjs.io';
import { ResizeState } from '../resize/model';

export function installCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = ResizeState.store.width;
    canvas.height = ResizeState.store.height;
    canvas.style.imageRendering = 'pixelated';
    
    const marker = document.createElement('span');
    marker.style.width = '1px';
    marker.style.height = '1px';
    marker.style.position = 'absolute';
    marker.style.visibility = 'hidden';
    marker.style.backgroundColor = 'white';
    marker.style.top = '0';
    marker.style.left = '0';
    
    const Presenter = new CanvasPresenter(canvas, marker);

    const Canvas = () => {
        const snapshot = useSnapshot(ResizeState);

        useEffect(() => {
            // eslint-disable-next-line valtio/state-snapshot-rule
            Presenter.canvasResize(snapshot.store.width, snapshot.store.height);
        }, [snapshot.store]);

        return <InternalCanvas 
            canvas={canvas}
            marker={marker}
            width={snapshot.store.width}
            height={snapshot.store.height}
            onMouseMove={(e) => Presenter.onMouseMove(e, new Color('white'), DisplayState.store.zoomFactor)}
            onMouseLeave={() => Presenter.onMouseLeave()}
        />;
    };

    return {
        Canvas,
        Presenter
    };
}
