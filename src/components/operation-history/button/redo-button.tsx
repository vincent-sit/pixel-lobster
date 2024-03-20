import React from 'react';
import { Button } from '../../../ui/button/button';
import resizeCanvasImage from '../../../assets/undo.png';

interface RedoButtonProps {
    onClick: () => void;
}

export function RedoButton({ onClick }: RedoButtonProps) {
    return (
        <Button onClick={onClick}>
            <img src={resizeCanvasImage} alt={'Resize Canvas'} style={{transform: 'scale(-1, 1)'}}/>
        </Button>
    );
}
