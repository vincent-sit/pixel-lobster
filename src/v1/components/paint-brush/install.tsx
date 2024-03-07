import React from 'react';
import { PaintbrushButton as InternalPaintbrushButton } from './paint-brush-button';
import { PaintBrushPresenter } from './presenter';
import { toolType } from '../tool/state';

export function installPaintBrush(
    changeTool : (newTool : toolType) => void,
    canvas : HTMLCanvasElement
) {
    const presenter = new PaintBrushPresenter(canvas);
    const draw = 
        (x : number, y : number, color : string) => 
            presenter.draw(x, y, color);

    const PaintbrushButton = () => {
        return <InternalPaintbrushButton handleClick={() => changeTool('paintbrush')}/>;
    };

    return {
        draw,
        PaintbrushButton
    };
}
