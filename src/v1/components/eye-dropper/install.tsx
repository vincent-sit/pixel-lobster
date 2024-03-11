import React from 'react';
import { EyeDropperButton as InternalColorPickerButton } from './eye-dropper-button';
import { EyeDropperPresenter } from './presenter';
import { ToolState, toolType } from '../tool/state';
import Color from 'colorjs.io';
import { useSnapshot } from 'valtio';

export function installEyeDropper(
    state : ToolState,
    changeTool : (newTool : toolType) => void,
    updateColor : (newColor : Color) => void
) {
    const presenter = new EyeDropperPresenter();
    const pick = 
        (x : number, y : number, canvas : HTMLCanvasElement) => 
            presenter.pick(x, y, canvas, updateColor);

    const EyeDropperButton = () => {
        const snapShot = useSnapshot(state);

        return <InternalColorPickerButton 
            handleClick={() => changeTool('eyedropper')}
            isToolInUse={snapShot.tool === 'eyedropper'}
        />;
    };

    return {
        pick,
        ColorPickerButton: EyeDropperButton
    };
}
