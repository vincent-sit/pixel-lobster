import { ref } from 'valtio';
import { ToolState } from './state';
import { Tool } from './types';

export class ToolPresenter {
    changeTool(state: ToolState, newTool: Tool) {
        state.tool = ref(newTool);
    }
}
