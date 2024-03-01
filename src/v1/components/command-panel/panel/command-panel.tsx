import React from 'react';
import { CommandPanelWrapper } from '../../../ui-style/command-panel/ui';
import { CommandButton } from '../button/command-button';
import clearCanvasImage from '../../../../assets/clearCanvas.png';
import { ResizeState } from '../../resize/model';


export function CommandPanel() {
    return (
        <CommandPanelWrapper>
            <CommandButton
                altText='Resize Canvas'
                imageLink={clearCanvasImage}
                onClick={() => ResizeState.toggleDialog('on')}
            />
        </CommandPanelWrapper>
    );
}
