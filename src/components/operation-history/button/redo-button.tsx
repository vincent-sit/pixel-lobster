import React from 'react';
import { Button } from '../../../ui/button/button';
import resizeCanvasImage from '../../../assets/resizeCanvas.png';

interface RedoButtonProps {
    onClick: () => void;
}

export function RedoButton({ onClick }: RedoButtonProps) {
    return (
        <Button onClick={onClick}>
            <img src={resizeCanvasImage} alt={'Resize Canvas'} />
        </Button>
    );
}
