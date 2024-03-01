import React from 'react';
import { CommandPanel } from './command-panel';
import { CanvasPresenter } from '../../canvas/presenter';

export function installCommandPanel(presenter : CanvasPresenter) {
    const CommandPanelComponent = () => (
        <CommandPanel presenter={presenter}/>
    );

    return {
        CommandPanelComponent
    };
}
