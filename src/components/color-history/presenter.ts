import Color from 'colorjs.io';
import { ref } from 'valtio';
import { ColorHistoryState } from './state';

const COLOR_HISTORY_LIMIT = 20;

export class ColorHistoryPresenter {
    addToColorHistory(state: ColorHistoryState, newColor: Color) {
        const newColorHistory = state.colorHistory.filter(
            (color) => color.toString() !== newColor.toString()
        );

        if (newColorHistory.length >= COLOR_HISTORY_LIMIT) {
            newColorHistory.splice(0, 1);
        }
        newColorHistory.push(newColor);
        state.colorHistory = ref(newColorHistory);
    }
}
