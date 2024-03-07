import Color from 'colorjs.io/types/src';
import { ref } from 'valtio';
import { ColorState } from './state';

const COLOR_HISTORY_LIMIT = 20;

export class ColorPresenter {
    updateColor(state : ColorState, newColor : Color) {
        state.color = ref(newColor);
    }

    addToColorHistory(state : ColorState, newColor : Color) {
        const newColorHistory = state.colorHistory.filter(color => color.toString() !== newColor.toString());

        if (newColorHistory.length >= COLOR_HISTORY_LIMIT) {
            newColorHistory.splice(0, 1);
        }
        newColorHistory.push(newColor);
        state.colorHistory = ref(newColorHistory);
    }
}
