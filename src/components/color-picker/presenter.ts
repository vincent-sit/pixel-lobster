import Color from 'colorjs.io/types/src';
import { ref } from 'valtio';
import { ColorPickerState } from './state';

export class ColorPickerPresenter {
    updateColor(state: ColorPickerState, newColor: Color) {
        state.color = ref(newColor);
    }
}
