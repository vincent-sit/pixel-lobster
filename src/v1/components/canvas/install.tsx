/* eslint-disable valtio/state-snapshot-rule */
import React , { useEffect }from 'react';
import { useSnapshot } from 'valtio';
import { Canvas as InternalCanvas } from './canvas';
import { CanvasPresenter } from './presenter';
import { ResizeState } from '../resize/model';
import { ColorState } from '../color-picker/model';

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
        const resize = useSnapshot(ResizeState);

        useEffect(() => {
            Presenter.canvasResize(resize.store.width, resize.store.height);
        }, [resize.store]);

        useEffect(() => {
            marker.style.backgroundColor = ColorState.store.currentColor.toString();
        }, [ColorState.store]);

        return <InternalCanvas 
            canvas={canvas}
            marker={marker}
            presenter={Presenter}
        />;
    };

    return {
        Canvas,
        Presenter
    };
}
