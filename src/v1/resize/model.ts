import { proxy } from 'valtio';

export class ResizeModel {
    width : number = 16;
    height : number = 16;
    isDialogActive : boolean = false;
}

export const ResizeState = proxy({
    store : new ResizeModel(),
    updateSize : (newW : number, newH : number) => {
        ResizeState.store.width = newW;
        ResizeState.store.height = newH;
    },
    toggleDialog : (state : string) => {
        ResizeState.store.isDialogActive = state === 'on' ? true : false;
    }
});
