import React from 'react';
import { CommandPanelWrapper } from '../../../ui-style/command-panel/ui';
import { CommandButton } from '../button/command-button';
import resizeCanvasImage from '../../../../assets/resizeCanvas.png';
import clearCanvasImage from '../../../../assets/clearCanvas.png';
import exportCanvasImage from '../../../../assets/export.png';
import { ResizeState } from '../../resize/model';
import { CanvasPresenter } from '../../canvas/presenter';

interface CommandPanelProps {
    presenter : CanvasPresenter;
}

export function CommandPanel({presenter} : CommandPanelProps) {
    return (
        <CommandPanelWrapper>
            <CommandButton
                altText='Export Canvas'
                imageLink={exportCanvasImage}
                onClick={() => presenter.exportCanvas()}
            />
            <CommandButton
                altText='Clear Canvas'
                imageLink={clearCanvasImage}
                onClick={() => presenter.clearCanvas()}
            />
            <CommandButton
                altText='Resize Canvas'
                imageLink={resizeCanvasImage}
                onClick={() => ResizeState.toggleDialog('on')}
            />
        </CommandPanelWrapper>
    );
}
