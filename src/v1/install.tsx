import React from 'react';
import { Skeleton } from './skeleton/skeleton';
import { installDisplay } from './display/install';
import { installCanvas } from './canvas/install';

export function installApp() {
    const { Canvas } = installCanvas();
    const { Display } = installDisplay(Canvas);

    const App = () => (
        <Skeleton Display={Display}/>
    );

    return {
        App,
    };
}
