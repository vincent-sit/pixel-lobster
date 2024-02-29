import React from 'react';
import { Button as InternalResizeButton } from '../../ui-style/button/ui';
import { ResizePresenter } from './presenter';

export function installResize(canvas: HTMLCanvasElement) {
    const presenter = new ResizePresenter(canvas);

    const ResizeButton = () => (
        <InternalResizeButton onClick={() => (width: number, height: number) => presenter.resize(width, height)}/>
    );

    return ResizeButton;
}
