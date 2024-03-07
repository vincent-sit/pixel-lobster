import Color from 'colorjs.io';
import { ColorPresenter } from './presenter';
import { createColorState } from './state';

export function installColor() {
    const state = createColorState();
    const presenter = new ColorPresenter();

    const updateColor = (newColor : Color) => presenter.updateColor(state, newColor);
    const addToColorHistory = (newColor : Color) => presenter.addToColorHistory(state, newColor);

    return {
        state,
        updateColor,
        addToColorHistory
    };
}
