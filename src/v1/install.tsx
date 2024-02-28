import React from 'react';
import { installCanvas } from './canvas/install';
import { Skeleton } from './skeleton/skeleton';

export function installApp() {
    const { Canvas } = installCanvas();

    const App = () => (
        <Skeleton Canvas={Canvas}/>
    );

    return {
        App,
    };
}
