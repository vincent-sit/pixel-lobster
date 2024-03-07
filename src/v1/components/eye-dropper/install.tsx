import React from 'react';
import { EyeDropperButton as InternalColorPickerButton } from './eye-dropper-button';
import { EyeDropperPresenter } from './presenter';
import { ToolState } from '../tool/state';
import Color from 'colorjs.io';

export function installEyeDropper(
    toolState : ToolState,
    updateColor : (newColor : Color) => void
) {
    const presenter = new EyeDropperPresenter();
    const pick = 
        (x : number, y : number, canvas : HTMLCanvasElement) => 
            presenter.pick(x, y, canvas, updateColor);

    const EyeDropperButton = () => {
        return <InternalColorPickerButton handleClick={() => presenter.changeTool(toolState)}/>;
    };

    return {
        pick,
        ColorPickerButton: EyeDropperButton
    };
}
