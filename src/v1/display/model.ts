import { proxy } from 'valtio';

export class DisplayModel {
    isWithinDisplay : boolean = false;
    zoomFactor : number = 3;
    scrollSpeed : number = 1.5;
}

export const DisplayState = proxy({
    store : new DisplayModel(),
    updateZoomFactor : (newZoomFactor : number) => {
        DisplayState.store.zoomFactor = newZoomFactor;
    }
});
