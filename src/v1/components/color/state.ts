import Color from 'colorjs.io';
import { proxy } from 'valtio';

export class ColorState {
    color : Color = new Color('white');
    colorHistory : Color[] = [];
}

export function createColorState() {
    return proxy(new ColorState());
}
