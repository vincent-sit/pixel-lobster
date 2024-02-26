import React from 'react';
import { ButtonWrapper } from '../../ui-style/button';

interface ButtonProps {
    text: string,
    id: string,
    imageLink : string,
    function : () => void;
}

export function CommandPanelButton(props: ButtonProps) {
    return (
        <ButtonWrapper id={props.id} onClick={props.function} title={props.text}>
            <img src={String(props.imageLink)} alt={props.text}/>
        </ButtonWrapper>
    );
}
