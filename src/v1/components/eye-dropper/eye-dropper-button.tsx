import React from 'react';
import { Button } from '../../ui-style/button/ui';
import colorPickerImage from '../../../assets/colorPicker.png';

interface EyeDropperProps {
    handleClick : () => void;
}

export function EyeDropperButton({handleClick} : EyeDropperProps) {
    
    return (
        <Button onClick={handleClick}>
            <img src={colorPickerImage} alt='Eye Dropper'/>
        </Button> 
    );
}
