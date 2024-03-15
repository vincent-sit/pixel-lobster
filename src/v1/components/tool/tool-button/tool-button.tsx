import React from 'react';
import { PressedButton } from '../../../ui-style/button/ui';

interface ToolButtonProps {
    isActive: boolean;
    imgSrc: string;
    alt: string;
    onClick: () => void;
}

export function ToolButton({
    isActive,
    imgSrc,
    alt,
    onClick,
}: ToolButtonProps) {
    return (
        <PressedButton onClick={onClick} isPressed={isActive}>
            <img src={imgSrc} alt={alt} />
        </PressedButton>
    );
}
