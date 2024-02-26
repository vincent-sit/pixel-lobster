import React, { useContext } from 'react';
import styled from 'styled-components';
import { CommandPanelButton } from './command-panel-button';
import clearCanvasImage from '../../assets/clearCanvas.png';
import exportImage from '../../assets/export.png';
import resizeImage from '../../assets/resizeCanvas.png';
import { DialogContext } from '../../contexts/dialog-context';

const Wrapper = styled.div`
    background-color: #C63F3F;
    width: 500px;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
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
            <CommandPanelButton text='Export Canvas' onClick={exportCanvas} imageLink={exportImage}/>
            <CommandPanelButton text='Clear Canvas' onClick={clearCanvas} imageLink={clearCanvasImage}/>
            <CommandPanelButton text='Resize Canvas' onClick={resizeCanvas} imageLink={resizeImage}/>
        </Wrapper>
    );
}
