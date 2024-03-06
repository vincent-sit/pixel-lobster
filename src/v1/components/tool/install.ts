import { ToolPresenter } from './presenter';
import { createToolState, toolType } from './state';

export function installTool() {
    const presenter = new ToolPresenter();
    const state = createToolState();

    const changeTool = (newTool : toolType) => presenter.changeTool(state, newTool);

    return {
        changeTool,
        state
    };
}
