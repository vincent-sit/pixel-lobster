import React from 'react';
import { EraserButton as InternalEraserButton} from './eraser-button';
import { EraserPresenter } from './presenter';
import { ToolState, toolType } from '../tool/state';
import { useSnapshot } from 'valtio';

export function installEraser(
    state : ToolState,
    changeTool : (newTool : toolType) => void,
    canvas : HTMLCanvasElement
) {
    const presenter = new EraserPresenter(canvas);
    const erase = 
        (x : number, y : number) => 
            presenter.erase(x, y);

    const EraserButton = () => {
        const snapShot = useSnapshot(state);

        return <InternalEraserButton
            handleClick={() => changeTool('eraser')}
            isToolInUse={snapShot.tool === 'eraser'}
        />;
    };

    return {
        erase,
        EraserButton
    };
}
