import React from 'react';
import { ExportButton as InternalExportButton } from './export-button';
import { ExportPresenter } from './presenter';

export function installExport(canvas: HTMLCanvasElement) {
    const presenter = new ExportPresenter();

    const ExportButton = () => {
        return (
            <InternalExportButton onClick={() => presenter.export(canvas)} />
        );
    };

    return {
        ExportButton,
    };
}
