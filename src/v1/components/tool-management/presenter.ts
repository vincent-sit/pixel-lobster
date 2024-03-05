import { ToolManagementState, toolType } from './state';

export class ToolManagementPresenter {
    changeTool(state : ToolManagementState, newTool : toolType) {
        state.tool = newTool;
    }
}
