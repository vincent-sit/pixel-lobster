import React from 'react';
import { ColorPickerButton as InternalColorPickerButton } from './color-picker-button';
import { ColorPickerPresenter } from './presenter';
import { ToolManagementState } from '../tool-management/state';

export function installColorPicker(
    toolState : ToolManagementState
) {
    const presenter = new ColorPickerPresenter();
    const pick = 
        (e : React.PointerEvent<HTMLDivElement>, color : string, zoomFactor : number, canvas : HTMLCanvasElement) => 
            presenter.pick(e, color, zoomFactor, canvas);

    const ColorPickerButton = () => {
        return <InternalColorPickerButton handleClick={() => presenter.changeTool(toolState)}/>;
    };

    return {
        pick,
        ColorPickerButton
    };
}
