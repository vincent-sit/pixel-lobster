import React from 'react';
import { ResizeButton } from './button';
import { ResizeState } from '../model';
import { InputState } from '../resize-input/input-model';

export function installResizeButtons() {

    function onSubmit() {
        ResizeState.updateSize(parseInt(InputState.store.width, 10), parseInt(InputState.store.height, 10));
        ResizeState.toggleDialog('off');
    }

    function onCancel() {
        ResizeState.toggleDialog('off');
    }

    const SubmitButton = () => (
        <ResizeButton columnStart='1' columnEnd='3' row='3' onClick={onSubmit} innerText='Confirm'/>
    );
    
    const CancelButton = () => (
        <ResizeButton columnStart='3' columnEnd='5' row='3' onClick={onCancel} innerText='Cancel'/>
    );

    return {
        SubmitButton,
        CancelButton
    };
}
