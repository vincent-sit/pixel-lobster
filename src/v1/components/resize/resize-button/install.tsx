import React from 'react';
import { Button as InternalResizeButton } from '../../../ui-style/button/ui';
import { ResizeState } from '../model';

export function installButton() {

    const ResizeButton = () => (
        <InternalResizeButton onClick={() => ResizeState.toggleDialog('on')}/>
    );

    return ResizeButton;
}
