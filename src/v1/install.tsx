import React from 'react';
import { Skeleton } from './skeleton/skeleton';

export function installApp() {
    const App = () => {
        return <Skeleton/>;
    };

    return {
        App,
    };
}
