import React from 'react';
import { Button } from '../../../ui-style/button/ui';

interface ResizeButtonProps {
    columnStart : string,
    columnEnd : string,
    row: string
    onClick : () => void,
    innerText : string
}

export function ResizeButton({columnStart, columnEnd, row, onClick, innerText} : ResizeButtonProps) {
    return (
        <Button
            onClick={onClick}
            style={{gridColumnStart: columnStart, gridColumnEnd: columnEnd, gridRow: row, justifySelf:'center'}}
            buttonshape='rectangle'
        >
            {innerText}
        </Button>
    );
}
