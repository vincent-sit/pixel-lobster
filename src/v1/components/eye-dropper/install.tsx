import React from 'react';
import { EyeDropperButton as InternalColorPickerButton } from './eye-dropper-button';
import { EyeDropperPresenter } from './presenter';
import { ToolState } from '../tool/state';

export function installEyeDropper(
    toolState : ToolState
) {
    const presenter = new EyeDropperPresenter();
    const pick = 
        (e : React.PointerEvent<HTMLDivElement>, color : string, zoomFactor : number, canvas : HTMLCanvasElement) => 
            presenter.pick(e, color, zoomFactor, canvas);

    const EyeDropperButton = () => {
        return <InternalColorPickerButton handleClick={() => presenter.changeTool(toolState)}/>;
    };

    return {
        pick,
        ColorPickerButton: EyeDropperButton
    };
}
