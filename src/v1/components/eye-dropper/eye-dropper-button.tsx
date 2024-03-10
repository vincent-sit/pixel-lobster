import React from 'react';
import { PressedButton } from '../../ui-style/button/ui';
import colorPickerImage from '../../../assets/colorPicker.png';

interface EyeDropperProps {
    handleClick : () => void;
    isToolInUse : boolean;
}

export function EyeDropperButton({handleClick, isToolInUse} : EyeDropperProps) {
    
    return (
        <PressedButton 
            onClick={handleClick}
            isPressed={isToolInUse}
        >
            <img src={colorPickerImage} alt='Eye Dropper'/>
        </PressedButton>
    );
}
