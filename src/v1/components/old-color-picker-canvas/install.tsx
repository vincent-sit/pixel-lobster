import React from 'react';
import { ColorPickerPresenter } from './presenter';
import { ColorState } from './model';
import { ColorPickerMainBody } from './color-picker';

export function installColorPicker() {
    const colorCanvas = document.createElement('canvas');
    const hueCanvas = document.createElement('canvas');
    const colorMarker = document.createElement('span');
    const hueMarker = document.createElement('span');

    colorCanvas.width = ColorState.store.CANVAS_SIZE;
    colorCanvas.height = ColorState.store.CANVAS_SIZE;
    hueCanvas.width = ColorState.store.HUE_WIDTH;
    hueCanvas.height = ColorState.store.CANVAS_SIZE;

    const markerStyle = 
        'position: absolute; display: block; width: 10px; height: 10px; border-radius: 9999999px; z-index: 1; transform: translate(-50%, -50%); border : 1px solid black';
    colorMarker.style.cssText = markerStyle;
    hueMarker.style.cssText = markerStyle;

    const presenter = new ColorPickerPresenter(colorCanvas, hueCanvas, colorMarker, hueMarker);
    
    const ColorPicker = () => {
        return <ColorPickerMainBody
            colorCanvas={colorCanvas}
            hueCanvas={hueCanvas}
            colorMarker={colorMarker}
            hueMarker={hueMarker}
            presenter={presenter}
        />;
    };

    return {
        ColorPicker,
        presenter
    };
}
