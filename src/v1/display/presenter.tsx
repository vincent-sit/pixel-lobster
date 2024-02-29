import { isWithinBounds } from '../../utils/ui-check';

export class DisplayPresenter {
    constructor(private readonly display : HTMLDivElement) {
        this.display = display;
    }

    private checkIfWithinDisplay(e : MouseEvent) {
        const rect = this.display.getBoundingClientRect();
        return isWithinBounds(e, rect);
    }

    updateZoomFactor(e : WheelEvent, scrollSpeed : number, zoomFactor : number) {
        if (!this.checkIfWithinDisplay(e)) return zoomFactor;
        const scrollDistance = e.deltaY === 0 ? 0 : e.deltaY < 0 ? scrollSpeed : -scrollSpeed;
        return zoomFactor + scrollDistance > 0.1 ? zoomFactor + scrollDistance : 0.1;
    }
}
