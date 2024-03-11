import Color from 'colorjs.io';
import { proxy, ref } from 'valtio';

type Ref<T extends object> = ReturnType<typeof ref<T>>;

export class ColorState {
    color : Ref<Color> = ref(new Color('hsv', [0, 0, 100]));
    colorHistory : Ref<Color[]> = ref([]);
}

export function createColorState() {
    return proxy(new ColorState());
}
