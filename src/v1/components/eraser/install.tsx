import React from 'react';
import { EraserButton as InternalEraserButton} from './eraser-button';
import { EraserPresenter } from './presenter';
import { ToolState } from '../tool/state';

export function installEraser(
    toolState : ToolState,
    canvas : HTMLCanvasElement
) {
    const presenter = new EraserPresenter(canvas);
    const erase = 
        (x : number, y : number) => 
            presenter.erase(x, y);

    const EraserButton = () => {
        return <InternalEraserButton handleClick={() => presenter.changeTool(toolState)}/>;
    };

    return {
        erase,
        EraserButton
    };
}
