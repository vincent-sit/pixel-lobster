import React, { useContext } from 'react';
import { ButtonWrapper } from '../command-panel/command-panel-button';
import { TOOL } from '../../contexts/tool-context';
import { ToolContext } from '../../contexts/tool-context';

export interface ToolButtonProps {
    tool : TOOL,
    imageLink : string,
    altText : string
}

export function ToolButton(props : ToolButtonProps) {
    // TODO: add a hover notification of what tool it is
    const {updateToolInUse} = useContext(ToolContext);

    function onClick() {
        updateToolInUse(props.tool);
    }

    return (
        <ButtonWrapper onClick={onClick}>
            <img src={String(props.imageLink)} alt={props.altText}/>
        </ButtonWrapper>
    );
}
