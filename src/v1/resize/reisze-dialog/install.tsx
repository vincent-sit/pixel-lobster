import React from 'react';
import { ResizeDialog as InternalResizeDialog } from './resize-dialog';

export function installResizeDialog() {

    const ResizeDialog = () => (
        <InternalResizeDialog/>
    );

    return ResizeDialog;
}
