import React from 'react';
import { Button } from '../../ui-style/button/ui';
import colorPickerImage from '../../../assets/colorPicker.png';

interface ColorPickerProps {
    handleClick : () => void;
}

export function ColorPickerButton({handleClick} : ColorPickerProps) {
    
    return (
        <Button onClick={handleClick}>
            <img src={colorPickerImage} alt='Color Picker'/>
        </Button> 
    );
}
