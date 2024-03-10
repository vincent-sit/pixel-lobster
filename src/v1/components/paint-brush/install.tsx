import React from 'react';
import { PaintbrushButton as InternalPaintbrushButton } from './paint-brush-button';
import { PaintBrushPresenter } from './presenter';
import { ToolState, toolType } from '../tool/state';
import { useSnapshot } from 'valtio';

export function installPaintBrush(
    state : ToolState,
    changeTool : (newTool : toolType) => void,
    canvas : HTMLCanvasElement
) {
    const presenter = new PaintBrushPresenter(canvas);
    const draw = 
        (x : number, y : number, color : string) => 
            presenter.draw(x, y, color);

    const PaintbrushButton = () => {
        const snapShot = useSnapshot(state);

        return <InternalPaintbrushButton 
            handleClick={() => changeTool('paintbrush')}
            isToolInUse={snapShot.tool === 'paintbrush'}
        />;
    };

    return {
        draw,
        PaintbrushButton
    };
}
