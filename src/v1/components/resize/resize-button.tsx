import React from 'react';
import { Button } from '../../ui/button/button';
import resizeCanvasImage from '../../../assets/resizeCanvas.png';

interface ResizeButtonProps {
    onClick: () => void;
}

export function ResizeButton({ onClick }: ResizeButtonProps) {
    return (
        <Button onClick={onClick}>
            <img src={resizeCanvasImage} alt={'Resize Canvas'} />
        </Button>
    );
}
