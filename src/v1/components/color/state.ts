import Color from 'colorjs.io';
import { proxy, ref } from 'valtio';

type Ref<T extends object> = ReturnType<typeof ref<T>>;

export class ColorState {
    color : Ref<Color> = ref(new Color('red'));
    colorHistory : Color[] = [];
}

export function createColorState() {
    return proxy(new ColorState());
}
