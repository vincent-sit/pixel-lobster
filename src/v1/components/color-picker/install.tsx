import React from 'react';
import { ColorCanvasPresenter } from './presenter';
import { createColorState } from './state';

export function installColorCanvas() {
    const presenter = new ColorCanvasPresenter();
    const state = createColorState();

    
}
