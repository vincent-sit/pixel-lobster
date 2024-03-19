import React from 'react';
import { useSnapshot } from 'valtio';
import Color from 'colorjs.io';
import { ToolPresenter } from './presenter';
import { createToolState } from './state';
import { Tool } from './types';
import { ToolButton } from './tool-button/tool-button';
import { installPaintBrush } from './paint-brush/install';
import { installEraser } from './eraser/install';
import paintbrushImage from '../../assets/paintbrush.png';
import eraserImage from '../../assets/eraser.png';
import eyeDropperImage from '../../assets/colorPicker.png';
import { installEyeDropper } from './eye-dropper/install';
import styled from 'styled-components';
import { Operation } from '../operation-history/type';

const StyledToolBar = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;

type ToolConfig = {
    tool: Tool;
    imgSrc: string;
    alt: string;
};

interface InstallToolParams {
    canvas: HTMLCanvasElement;
    getColor: () => Color;
    setColor: (newColor: Color) => void;
    addToColorHistory: (color: Color) => void;
    addToHistory : (operation : Operation) => void;
}

export function installTool({
    canvas,
    getColor,
    setColor,
    addToColorHistory,
    addToHistory
}: InstallToolParams) {
    const { tool: paintBrushTool } = installPaintBrush(
        canvas,
        getColor,
        addToColorHistory,
        addToHistory
    );
    const { tool: eraserTool } = installEraser(canvas, addToHistory);
    const { tool: eyeDropperTool } = installEyeDropper(canvas, setColor);

    const tools: ToolConfig[] = [
        {
            tool: paintBrushTool,
            imgSrc: paintbrushImage,
            alt: 'Paint Brush',
        },
        {
            tool: eraserTool,
            imgSrc: eraserImage,
            alt: 'Eraser',
        },
        {
            tool: eyeDropperTool,
            imgSrc: eyeDropperImage,
            alt: 'Eye Dropper',
        },
    ];

    const presenter = new ToolPresenter();
    const state = createToolState(paintBrushTool);

    const getTool = () => state.tool;

    const ToolBar = () => {
        const snap = useSnapshot(state);

        return (
            <StyledToolBar>
                {tools.map((tool) => (
                    <ToolButton
                        key={tool.alt}
                        isActive={snap.tool === tool.tool}
                        imgSrc={tool.imgSrc}
                        alt={tool.alt}
                        onClick={() => presenter.changeTool(state, tool.tool)}
                    />
                ))}
            </StyledToolBar>
        );
    };

    return {
        ToolBar,
        getTool,
    };
}
