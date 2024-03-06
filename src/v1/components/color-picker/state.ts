import Color from 'colorjs.io';
import { proxy } from 'valtio';

export class ColorState {
    color : Color = new Color('white');
}

export function createColorState() {
    return proxy(new ColorState());
}
