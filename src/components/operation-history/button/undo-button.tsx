import React from 'react';
import { Button } from '../../../ui/button/button';
import resizeCanvasImage from '../../../assets/undo.png';

interface UndoButtonProps {
    onClick: () => void;
}

export function UndoButton({ onClick }: UndoButtonProps) {
    return (
        <Button onClick={onClick}>
            <img src={resizeCanvasImage} alt={'Resize Canvas'} />
        </Button>
    );
}
