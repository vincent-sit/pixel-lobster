import Color from 'colorjs.io/types';
import React from 'react';
import { ColorPicker as InternalColorPicker } from './color-picker';
import { useSnapshot } from 'valtio';
import { createColorPickerState } from './state';
import { ColorPickerPresenter } from './presenter';

export function installColorPicker() {
    const state = createColorPickerState();
    const presenter = new ColorPickerPresenter();

    const setColor = (newColor: Color) =>
        presenter.updateColor(state, newColor);
    const getColor = () => state.color;

    const ColorPicker = () => {
        const snapshot = useSnapshot(state);
        return (
            <InternalColorPicker color={snapshot.color} onChange={setColor} />
        );
    };

    return {
        ColorPicker,
        getColor,
        setColor,
    };
}
