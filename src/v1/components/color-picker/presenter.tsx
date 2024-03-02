import Color from 'colorjs.io';

// color picker needs to be able to track mouse movement across the entire body 
// but only change color canvas/hue canvas when there is a click and hold

export class ColorPickerPresenter {
    constructor(
        private readonly colorSelector : HTMLCanvasElement,
        private readonly hueSelector : HTMLCanvasElement,
        private readonly colorMarker : HTMLSpanElement,
        private readonly hueMarker : HTMLSpanElement,
    ) {
        this.colorSelector = colorSelector;
        this.hueSelector = hueSelector;
        this.colorMarker = colorMarker;
        this.hueMarker = hueMarker;
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

    moveColorMarker(e : PointerEvent, rect : DOMRect) {
        if (e.pressure > 0) {
            this.colorMarker.style.transform = 
                `translate(${e.clientX - rect.x}px, ${e.clientY - rect.y}px) translate(-50%, -50%)`;
        }
    }

    // moveMarkers(newX : number, newY : number, ) {
    //     if (state.isColorDown) {
    //         if (!this.colorMarker) return;
    //         this.colorMarker.style.transform = `translate(${state.colorX}px, ${state.colorY}px) translate(-50%, -50%)`;
    //     } else if (state.isHueDown) {
    //         if (!this.hueSelector) return;
    //         this.hueSelector.style.transform = `translateY(${state.hueY}px) translate(-50%, -50%)`;
    //     } else {
    //         if (!this.hueSelector || !this.colorSelector || !this.colorMarker || !this.hueMarker) return;
    //         // hue
    //         const newHueY = state.currentColor.hsv.h / 360 * this.hueSelector.height;
    //         this.hueMarker.style.transform = `translateY(${newHueY}px) translate(-50%, -50%)`;
    //         // color
    //         const newColorX = state.currentColor.hsv.s / 100 * this.colorSelector.width;
    //         const newColorY = (1 - (state.currentColor.hsv.v / 100)) * this.colorSelector.height;
    //         this.colorMarker.style.transform = `translate(${newColorX}px, ${newColorY}px) translate(-50%, -50%)`;
    //         this.colorMarker.style.border = `1px solid ${newColorY > this.colorSelector.height / 2 ? 'white' : 'black'}`;
    //     }
    // }
}
