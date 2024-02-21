import React from 'react';
import styled from 'styled-components';
import { CommandPanelButton } from './command-panel-button';

const Wrapper = styled.div`
    background-color: #C63F3F;
    height: 70px;
    width: 500px;
    display: flex;

    button {
        margin: 10px;        
    }
`;

export function CommandPanel() {
    function clearCanvas() {
        const canvas = document.getElementById('drawing-canvas');
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) return;
        const context = canvas.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height);
    }

    function exportCanvas() {
        const canvas = document.getElementById('drawing-canvas');
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) return;
        const canvasUrl = canvas.toDataURL();
        const createEl = document.createElement('a');
        createEl.href = canvasUrl;
            
        createEl.download = 'pixel-lobster-art';
        createEl.click();
        createEl.remove();
    }

    return (
        <Wrapper>
            <CommandPanelButton text='Clear Canvas' id='clear-canvas-button' function={clearCanvas}/>
            <CommandPanelButton text='Export Canvas' id='export-canvas-button' function={exportCanvas}/>
        </Wrapper>
    );
}
