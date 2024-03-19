import React, { useContext } from 'react';
import { ButtonWrapper } from '../../ui-style/button';
import { TOOL } from '../../contexts/tool-context';
import { ToolContext } from '../../contexts/tool-context';
import { styled } from 'styled-components';

export interface ToolButtonProps {
    tool : TOOL,
    imageLink : string,
    altText : string,
    isPressed : boolean
}

const PressedStateButtonWrapper = styled(ButtonWrapper)<{ isPressed?: boolean; }>`
    filter: ${props => props.isPressed ? 'brightness(80%)' : 'brightness(100%)'};
`;

export function ToolButton(props : ToolButtonProps) {
    // TODO: add a hover notification of what tool it is
    const {updateToolInUse} = useContext(ToolContext);

    function onClick() {
        updateToolInUse(props.tool);
    }

    return (
        <PressedStateButtonWrapper onClick={onClick} isPressed={props.isPressed} title={props.altText}>
            <img src={String(props.imageLink)} alt={props.altText}/>
        </PressedStateButtonWrapper>
    );
}
