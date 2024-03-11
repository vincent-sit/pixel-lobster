import Color from 'colorjs.io/types';
import React from 'react';
import { ColorState } from '../color/state';
import { ColorPicker as InternalColorPicker } from './color-picker';
import { useSnapshot } from 'valtio';

export function installColorPicker(
    state : ColorState,
    updateColor : (newColor : Color) => void
) {
    const ColorPicker = () => {
        const snapshot = useSnapshot(state);
        return <InternalColorPicker color={snapshot.color} onChange={updateColor}/>;
    };

    return {
        ColorPicker
    };
}
