import React from 'react';
import { Button } from '../../ui-style/button/ui';
import clearCanvasImage from '../../../assets/clearCanvas.png';
interface ClearCanvasProps {
    onClick : () => void;
}

export function ClearCanvasButton({onClick} : ClearCanvasProps ) {
    return (
        <Button onClick={onClick}>
            <img src={clearCanvasImage} alt='Clear Canvas'/>
        </Button>
    );
}
