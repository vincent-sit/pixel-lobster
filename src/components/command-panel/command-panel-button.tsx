import React from 'react';
import { ButtonWrapper } from '../../ui-style/button';

interface ButtonProps {
    text: string,
    imageLink : string,
    onClick : () => void;
}

export function CommandPanelButton(props: ButtonProps) {
    return (
        <ButtonWrapper onClick={props.onClick} title={props.text}>
            <img src={String(props.imageLink)} alt={props.text}/>
        </ButtonWrapper>
    );
}
