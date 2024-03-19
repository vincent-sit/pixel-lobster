import { proxy } from 'valtio';

export class CanvasState {
    width: number = 16;
    height: number = 16;
}

export function createCanvasState() {
    return proxy(new CanvasState());
}
