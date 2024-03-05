import React from 'react';
import { PaintbrushButton as InternalPaintbrushButton } from './paint-brush-button';
import { PaintBrushPresenter } from './presenter';
import { ToolManagementState } from '../tool-management/state';

export function installPaintBrush(
    toolState : ToolManagementState
) {
    const presenter = new PaintBrushPresenter();
    const draw = 
        (e : React.PointerEvent<HTMLDivElement>, color : string, zoomFactor : number, canvas : HTMLCanvasElement) => 
            presenter.draw(e, color, zoomFactor, canvas);

    const PaintbrushButton = () => {
        return <InternalPaintbrushButton handleClick={() => presenter.changeTool(toolState)}/>;
    };

    return {
        draw,
        PaintbrushButton
    };
}
