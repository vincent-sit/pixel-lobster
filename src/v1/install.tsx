import React from 'react';
import { Skeleton } from './components/skeleton/skeleton';
import { installDisplay } from './components/display/install';
import { installCanvas } from './components/canvas/install';
import { installResizeDialog } from './components/resize/reisze-dialog/install';
import { installCommandPanel } from './components/command-panel/panel/install';

export function installApp() {
    const { Canvas, Presenter : CanvasPresenter } = installCanvas();
    const { Display } = installDisplay(Canvas);
    const ResizeDialog = installResizeDialog();
    const { CommandPanelComponent } = installCommandPanel(CanvasPresenter);

    const App = () => (
        <Skeleton 
            Display={Display}
            ResizeDialog={ResizeDialog}
            CommandPanel={CommandPanelComponent}
        />
    );

    return {
        App,
    };
}
