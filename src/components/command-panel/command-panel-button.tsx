import React from 'react';
import styled from 'styled-components';

export const ButtonWrapper = styled.button`
    display: block;
    background: lightgrey;    
    width: 50px;
    height: 50px;
    padding: 0;
    border-width: 0;
    border-radius: 0.6rem;

    &:hover {
        cursor: pointer;
        filter: brightness(125%);
    }

    &:active {
        transform: scale(0.98); 
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24); 
    }
`;

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
