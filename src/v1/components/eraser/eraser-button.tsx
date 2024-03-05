import React from 'react';
import { Button } from '../../ui-style/button/ui';
import eraserImage from '../../../assets/eraser.png';

interface EraserProps {
    handleClick : () => void;
}

export function EraserButton({handleClick} : EraserProps) {
    return (
        <Button onClick={handleClick}>
            <img src={eraserImage} alt='Eraser'/>
        </Button> 
    );
}
