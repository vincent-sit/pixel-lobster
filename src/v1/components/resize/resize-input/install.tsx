import React from 'react';
import { InputState } from './input-model';
import { ResizeInput } from './resize-input';

export function installResizeInput() {
    const WidthInput = () => (
        <ResizeInput id='width' innerText='W' innerValue={InputState.store.width} onChange={InputState.setWidth}/>
    );

    const HeightInput = () => (
        <ResizeInput id='height' innerText='H' innerValue={InputState.store.height} onChange={InputState.setHeight}/>
    );

    return {
        WidthInput,
        HeightInput
    };
}
