import React from 'react';
import { Button } from '../../ui-style/button/ui';
import paintbrushImage from '../../../assets/paintbrush.png';

interface PaintbrushProps {
    handleClick : () => void;
}

export function PaintbrushButton({handleClick} : PaintbrushProps) {
    return (
        <Button onClick={handleClick}>
            <img src={paintbrushImage} alt='Paint Brush'/>
        </Button> 
    );
}
