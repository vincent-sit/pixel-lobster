import { proxy } from 'valtio';

export class InputModel {
    width : string = '16';
    height : string = '16';
}

export const InputState = proxy({
    store : new InputModel(),
    setHeight : (newH : string) => { InputState.store.height = newH;},
    setWidth : (newW : string) => { InputState.store.width = newW;}
});
