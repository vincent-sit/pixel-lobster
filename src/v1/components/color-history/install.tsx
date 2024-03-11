import React from 'react';
import Color from 'colorjs.io';
import { ColorHistory as InternalColorHistory } from './color-history';
import { ColorState } from '../color/state';
import { useSnapshot } from 'valtio';

export function installColorHistory(
    colorState : ColorState,
    updateColor : (newColor : Color) => void
) {
    const ColorHistory = () => {
        const snap = useSnapshot(colorState);
        return <InternalColorHistory
            colorHistory={snap.colorHistory}
            onChange={updateColor}
        />;
    };

    return {
        ColorHistory
    };
}
