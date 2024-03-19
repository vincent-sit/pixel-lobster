import React from 'react';
import { Button } from '../../ui/button/button';
import exportCanvasImage from '../../assets/exportCanvas.png';

interface ExportProps {
    onClick: () => void;
}

export function ExportButton({ onClick }: ExportProps) {
    return (
        <Button onClick={onClick}>
            <img src={exportCanvasImage} alt={'Export Canvas'} />
        </Button>
    );
}
