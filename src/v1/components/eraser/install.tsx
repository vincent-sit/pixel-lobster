import React from 'react';
import { EraserButton as InternalEraserButton} from './eraser-button';
import { EraserPresenter } from './presenter';
import { ToolManagementState } from '../tool-management/state';

export function installEraser(
    toolState : ToolManagementState
) {
    const presenter = new EraserPresenter();
    const erase = 
        (e : React.PointerEvent<HTMLDivElement>, zoomFactor : number, canvas : HTMLCanvasElement) => 
            presenter.erase(e, zoomFactor, canvas);

    const EraserButton = () => {
        return <InternalEraserButton handleClick={() => presenter.changeTool(toolState)}/>;
    };

    return {
        erase,
        EraserButton
    };
}
