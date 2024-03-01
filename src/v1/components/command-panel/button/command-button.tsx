import React from 'react';
import { Button } from '../../../ui-style/button/ui';

interface CommandButtonProps {
    altText : string,
    imageLink : string,
    onClick : () => void
}

export function CommandButton({altText, imageLink, onClick} : CommandButtonProps) {
    return (
        <Button onClick={onClick}>
            <img src={String(imageLink)} alt={altText}/>
        </Button>
    );
}
