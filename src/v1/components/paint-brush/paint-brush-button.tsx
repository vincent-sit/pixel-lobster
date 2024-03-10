import React from 'react';
import { PressedButton } from '../../ui-style/button/ui';
import paintbrushImage from '../../../assets/paintbrush.png';

interface PaintbrushProps {
    handleClick : () => void;
    isToolInUse : boolean;
}

export function PaintbrushButton({handleClick, isToolInUse} : PaintbrushProps) {
    return (
        <PressedButton
            onClick={handleClick}
            isPressed={isToolInUse}
        >
            <img src={paintbrushImage} alt='Paint Brush'/>
        </PressedButton>
    );
}
