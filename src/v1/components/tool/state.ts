import { proxy } from 'valtio';

export type toolType = 'paintbrush' | 'eraser' | 'colorpicker';

export class ToolState {
    tool : toolType = 'paintbrush';
}

export function createToolState() {
    return proxy(new ToolState());
}
