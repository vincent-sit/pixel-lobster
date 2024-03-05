import { ToolManagementPresenter } from './presenter';
import { createToolManagementState, toolType } from './state';

export function installToolManagement() {
    const presenter = new ToolManagementPresenter();
    const state = createToolManagementState();

    const changeTool = (newTool : toolType) => presenter.changeTool(state, newTool);

    return {
        changeTool,
        state
    };
}
