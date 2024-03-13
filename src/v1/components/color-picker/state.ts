import Color from 'colorjs.io';
import { proxy, ref, Ref } from 'valtio';

export class ColorPickerState {
    color : Ref<Color> = ref(new Color('hsv', [0, 0, 100]));
}

export function createColorPickerState() {
    return proxy(new ColorPickerState());
}
