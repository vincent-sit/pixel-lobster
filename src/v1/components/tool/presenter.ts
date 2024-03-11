import { ToolState, toolType } from './state';

export class ToolPresenter {
    changeTool(state : ToolState, newTool : toolType) {
        state.tool = newTool;
    }

    checkIfToolInUse(state : ToolState, currentTool : toolType) {
        return state.tool === currentTool;
    } 
}
