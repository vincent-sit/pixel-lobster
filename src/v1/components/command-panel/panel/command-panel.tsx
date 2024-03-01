import React from 'react';
import { CommandPanelWrapper } from '../../../ui-style/command-panel/ui';
import { CommandButton } from '../button/command-button';
import resizeCanvasImage from '../../../../assets/resizeCanvas.png';
import clearCanvasImage from '../../../../assets/clearCanvas.png';
import exportCanvasImage from '../../../../assets/export.png';
import { ResizeState } from '../../resize/model';


export function CommandPanel() {
    return (
        <CommandPanelWrapper>
            <CommandButton
                altText='Export Canvas'
                imageLink={exportCanvasImage}
                onClick={() => ResizeState.toggleDialog('on')}
            />
            <CommandButton
                altText='Clear Canvas'
                imageLink={clearCanvasImage}
                onClick={() => ResizeState.toggleDialog('on')}
            />
            <CommandButton
                altText='Resize Canvas'
                imageLink={resizeCanvasImage}
                onClick={() => ResizeState.toggleDialog('on')}
            />
        </CommandPanelWrapper>
    );
}
