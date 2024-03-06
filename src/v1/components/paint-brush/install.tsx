import React from 'react';
import { PaintbrushButton as InternalPaintbrushButton } from './paint-brush-button';
import { PaintBrushPresenter } from './presenter';
import { ToolState } from '../tool/state';

export function installPaintBrush(
    toolState : ToolState,
    canvas : HTMLCanvasElement
) {
    const presenter = new PaintBrushPresenter(canvas);
    const draw = 
        (x : number, y : number, color : string) => 
            presenter.draw(x, y, color);

    const PaintbrushButton = () => {
        return <InternalPaintbrushButton handleClick={() => presenter.changeTool(toolState)}/>;
    };

    return {
        draw,
        PaintbrushButton
    };
}
