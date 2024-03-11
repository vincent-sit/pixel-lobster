import React from 'react';
import { PressedButton } from '../../ui-style/button/ui';
import eraserImage from '../../../assets/eraser.png';

interface EraserProps {
    handleClick : () => void;
    isToolInUse : boolean;
}

export function EraserButton({handleClick, isToolInUse} : EraserProps) {
    return (
        <PressedButton 
            onClick={handleClick}
            isPressed={isToolInUse}
        >
            <img src={eraserImage} alt='Eraser'/>
        </PressedButton> 
    );
}
