import { proxy } from 'valtio';

export class ZoomState {
    zoomFactor : number = 3;
    scrollSpeed : number = 1.5;
}

export function createZoomState() {
    return proxy(new ZoomState());
}
