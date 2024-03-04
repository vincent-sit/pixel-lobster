import React from 'react';
import { Button } from '../../ui-style/button/ui';
import exportCanvasImage from '../../../assets/exportCanvas.png';

interface ExportCanvasProps {
    onClick : () => void;
}

export function ExportCanvasButton({onClick} : ExportCanvasProps ) {
    return (
        <Button onClick={onClick}>
            <img src={exportCanvasImage} alt={'Export Canvas'}/>
        </Button>
    );
}
