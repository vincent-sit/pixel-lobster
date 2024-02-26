import React, { useContext } from 'react';
import styled from 'styled-components';
import { CommandPanelButton } from './command-panel-button';
import clearCanvasImage from '../../assets/clearCanvas.png';
import exportImage from '../../assets/export.png';
import resizeImage from '../../assets/resizeCanvas.png';
import { DialogContext } from '../../contexts/dialog-context';

const Wrapper = styled.div`
    background-color: #C63F3F;
    height: 70px;
    width: 500px;
    display: flex;
    align-items: center;

    button {
        margin: 10px;

    }
`;

export function CommandPanel() {
    const { setIsDialogActive } = useContext(DialogContext);

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

    function resizeCanvas() {
        setIsDialogActive(true);
    }

    return (
        <Wrapper>
            <CommandPanelButton text='Export Canvas' id='export-canvas-button' function={exportCanvas} imageLink={exportImage}/>
            <CommandPanelButton text='Clear Canvas' id='clear-canvas-button' function={clearCanvas} imageLink={clearCanvasImage}/>
            <CommandPanelButton text='Resize Canvas' id='resize-canvas-button' function={resizeCanvas} imageLink={resizeImage}/>            
        </Wrapper>
    );
}
