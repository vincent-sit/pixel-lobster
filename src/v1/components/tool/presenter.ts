import { ToolState, toolType } from './state';

export class ToolPresenter {
    changeTool(state : ToolState, newTool : toolType) {
        state.tool = newTool;
    }
}
