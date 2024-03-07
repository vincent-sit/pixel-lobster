import React from 'react';
import { EraserButton as InternalEraserButton} from './eraser-button';
import { EraserPresenter } from './presenter';
import { toolType } from '../tool/state';

export function installEraser(
    changeTool : (newTool : toolType) => void,
    canvas : HTMLCanvasElement
) {
    const presenter = new EraserPresenter(canvas);
    const erase = 
        (x : number, y : number) => 
            presenter.erase(x, y);

    const EraserButton = () => {
        return <InternalEraserButton handleClick={() => changeTool('eraser')}/>;
    };

    return {
        erase,
        EraserButton
    };
}
