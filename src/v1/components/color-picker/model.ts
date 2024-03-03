import Color from 'colorjs.io';
import { proxy } from 'valtio';

const COLOR_HISTORY_LIMIT = 20;

export class ColorModel {
    currentColor : Color = new Color('white');
    colorHistory : Color[] = [];
    colorX : number = 0;
    colorY : number = 0;
    hueY : number = 0;
    readonly CANVAS_SIZE : number = 300;
    readonly HUE_WIDTH : number = 30;
}

export const ColorState = proxy({
    store : new ColorModel(),
    updateCurrentColor : (h : number, s : number, v : number) => {
        ColorState.store.currentColor = new Color('hsv', [
            h / ColorState.store.CANVAS_SIZE * 360,
            s / ColorState.store.CANVAS_SIZE * 100,
            (1 - v / ColorState.store.CANVAS_SIZE) * 100
        ]);
    },
    updateValue : (newColorY : number) => {
        ColorState.store.colorY = newColorY;
    },
    updateSaturation : (newColorX : number) => {
        ColorState.store.colorX = newColorX;
    },
    updateHue : (newHueY : number) => {
        ColorState.store.hueY = newHueY;
    },
    addColorHistory : (newColor : Color) => {
        ColorState.store.colorHistory.push(newColor);
        if (ColorState.store.colorHistory.length > COLOR_HISTORY_LIMIT) {
            ColorState.store.colorHistory.splice(0, 1);
        }
    }
});
