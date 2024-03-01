import React , { useEffect }from 'react';
import { useSnapshot } from 'valtio';
import { Canvas as InternalCanvas } from './canvas';
import { CanvasPresenter } from './presenter';
import { DisplayState } from '../display/model';
import Color from 'colorjs.io';
import { ResizePresenter } from '../resize/presenter';
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
    
    const presenter = new CanvasPresenter(canvas, marker);
    const resizePresenter = new ResizePresenter(canvas);

    const Canvas = () => {
        const snapshot = useSnapshot(ResizeState);

        useEffect(() => {
            // eslint-disable-next-line valtio/state-snapshot-rule
            resizePresenter.canvasResize(snapshot.store.width, snapshot.store.height);
        }, [snapshot.store]);

        return <InternalCanvas 
            canvas={canvas}
            marker={marker}
            width={snapshot.store.width}
            height={snapshot.store.height}
            onMouseMove={(e) => presenter.onMouseMove(e, new Color('white'), DisplayState.store.zoomFactor)}
            onMouseLeave={() => presenter.onMouseLeave()}
        />;
    };

    return {
        Canvas,
        presenter
    };
}
