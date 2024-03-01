import React from 'react';
import { Skeleton } from './skeleton/skeleton';
import { installDisplay } from './display/install';
import { installCanvas } from './canvas/install';
import { installResizeDialog } from './resize/reisze-dialog/install';

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
