import Color from 'colorjs.io';
import { isWithinBounds } from '../../../utils/ui-check';
import { clamp } from '../../../utils/math';
import { ColorState } from './model';

// color picker needs to be able to track mouse movement across the entire body 
// but only change color canvas/hue canvas when there is a click and hold

export class ColorPickerPresenter {
    originatedFromColor: boolean;
    originatedFromHue : boolean;

    constructor(
        private readonly colorSelector : HTMLCanvasElement,
        private readonly hueSelector : HTMLCanvasElement,
        private readonly colorMarker : HTMLSpanElement,
        private readonly hueMarker : HTMLSpanElement
    ) {
        this.colorSelector = colorSelector;
        this.hueSelector = hueSelector;
        this.colorMarker = colorMarker;
        this.hueMarker = hueMarker;
        this.originatedFromColor = false;
        this.originatedFromHue = false;
    }

    createHueSlider(height : number) {
        if (!this.hueSelector) return;

        const currSliderCtx = this.hueSelector.getContext('2d');
        if (!currSliderCtx) return;

        const gradient = currSliderCtx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
        currSliderCtx.fillStyle = gradient;
        currSliderCtx.fillRect(0, 0, currSliderCtx.canvas.width, currSliderCtx.canvas.height);
    }

    updateColorCanvas(hue : number) {
        const currCtx = this.colorSelector.getContext('2d');
        if (!currCtx) return;
        
        const gradientH = currCtx.createLinearGradient(0, 0, currCtx.canvas.width, 0);
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, new Color('hsv', [hue, 100, 100]).to('srgb').toString());
        currCtx.fillStyle = gradientH;
        currCtx.fillRect(0, 0, currCtx.canvas.width, currCtx.canvas.height);

        const gradientV = currCtx.createLinearGradient(0, 0, 0, currCtx.canvas.height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, '#000');
        currCtx.fillStyle = gradientV;
        currCtx.fillRect(0, 0, currCtx.canvas.width, currCtx.canvas.height);
    }

    adjustColor(colorX : number, colorY: number, color: Color, newHue? : number) {
        if (!this.colorSelector) return;
        const saturation = colorX / this.colorSelector.width;
        const value = colorY / this.colorSelector.height;
        const newColor = new Color('hsv', [color.hsl.h, saturation * 100, (1 - value) * 100]);
        if (newHue) newColor.hsv.h = newHue;
        return newColor;
    }

    handleMove(e : PointerEvent) {
        let {colorX, colorY, hueY} = ColorState.store;
        const {CANVAS_SIZE} = ColorState.store;

        if (e.pressure <= 0 && !this.originatedFromColor && !this.originatedFromHue) return;

        if (this.originatedFromColor) {
            const rect = this.colorSelector.getBoundingClientRect();
            colorX = clamp(e.clientX - rect.x, 0, rect.width);
            colorY = clamp(e.clientY - rect.y, 0, rect.height);
            ColorState.updateSaturation(colorX);
            ColorState.updateValue(colorY);
            this.colorMarker.style.transform = 
                `translate(${colorX}px, ${colorY}px) translate(-50%, -50%)`;
            this.colorMarker.style.border = 
                `1px solid ${colorY > CANVAS_SIZE /2 ? 'white' : 'black'}`;
        } else if (this.originatedFromHue) {
            const rect = this.hueSelector.getBoundingClientRect();
            hueY = clamp(e.clientY - rect.y, 0, rect.height);
            ColorState.updateHue(hueY);
            this.hueMarker.style.transform = `translateY(${hueY}px) translate(-50%, -50%)`;
        }
        ColorState.updateCurrentColor(ColorState.store.hueY, ColorState.store.colorX, ColorState.store.colorY);
    }

    handleDown(e : PointerEvent) {
        const {CANVAS_SIZE} = ColorState.store;
        const colorRect = this.colorSelector.getBoundingClientRect();
        const hueRect = this.hueSelector.getBoundingClientRect();
        
        if (!isWithinBounds(e, colorRect) && !isWithinBounds(e, hueRect)) return;
        
        if (isWithinBounds(e, colorRect)) {
            this.originatedFromColor = true;
            ColorState.updateSaturation(e.clientX - colorRect.x);
            ColorState.updateValue(e.clientY - colorRect.y);
            this.colorMarker.style.transform = 
                `translate(${ColorState.store.colorX}px, ${ColorState.store.colorY}px) translate(-50%, -50%)`;
            this.colorMarker.style.border = 
                `1px solid ${(ColorState.store.colorY) > CANVAS_SIZE /2 ? 'white' : 'black'}`;
        } else if (isWithinBounds(e, hueRect)) {
            this.originatedFromHue = true;
            ColorState.updateHue(e.clientY - hueRect.y);
            this.hueMarker.style.transform = `translateY(${ColorState.store.hueY}px) translate(-50%, -50%)`;
        }

        ColorState.updateCurrentColor(ColorState.store.hueY, ColorState.store.colorX, ColorState.store.colorY);
    }

    handleUp() {
        this.originatedFromColor = false;
        this.originatedFromHue = false;
        ColorState.updateCurrentColor(ColorState.store.hueY, ColorState.store.colorX, ColorState.store.colorY);
    }
}
