import { proxy } from 'valtio';

export type toolType = 'paintbrush' | 'eraser' | 'colorpicker';

export class ToolManagementState {
    tool : toolType = 'paintbrush';
}

export function createToolManagementState() {
    return proxy(new ToolManagementState());
}
