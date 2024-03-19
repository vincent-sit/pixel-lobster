import React from 'react';
import Color from 'colorjs.io';
import { ColorHistory as InternalColorHistory } from './color-history';
import { useSnapshot } from 'valtio';
import { ColorHistoryPresenter } from './presenter';
import { createColorHistoryState } from './state';

export function installColorHistory(setColor: (newColor: Color) => void) {
    const state = createColorHistoryState();
    const presenter = new ColorHistoryPresenter();

    const addToColorHistory = (newColor: Color) =>
        presenter.addToColorHistory(state, newColor);

    const ColorHistory = () => {
        const snap = useSnapshot(state);
        return (
            <InternalColorHistory
                colorHistory={snap.colorHistory}
                onChange={setColor}
            />
        );
    };

    return {
        ColorHistory,
        addToColorHistory,
    };
}
