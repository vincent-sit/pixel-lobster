import Color from 'colorjs.io';
import { proxy, ref, Ref } from 'valtio';

export class ColorHistoryState {
    colorHistory : Ref<Color[]> = ref([]);
}

export function createColorHistoryState() {
    return proxy(new ColorHistoryState());
}
