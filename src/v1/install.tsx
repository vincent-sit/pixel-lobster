import React from 'react';
import { Skeleton } from './components/skeleton/skeleton';
import { installDisplay } from './components/display/install';
import { installCanvas } from './components/canvas/install';
import { installResizeDialog } from './components/resize/reisze-dialog/install';

export function installApp() {
    const { Canvas } = installCanvas();
    const { Display } = installDisplay(Canvas);
    const ResizeDialog = installResizeDialog();

    const App = () => (
        <Skeleton Display={Display} ResizeDialog={ResizeDialog}/>
    );

    return {
        App,
    };
}
