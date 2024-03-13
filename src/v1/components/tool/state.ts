import { proxy, ref, Ref } from 'valtio';
import { Tool } from './types';

export class ToolState {
    tool: Ref<Tool>;

    constructor(tool : Tool) {
        this.tool = ref(tool);
    }
}

export function createToolState(defaultTool : Tool) {
    return proxy(new ToolState(defaultTool));
}
