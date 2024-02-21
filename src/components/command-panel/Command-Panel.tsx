import React from 'react';
import styled from 'styled-components';
import { CommandPanelButton } from './command-panel-button';

const Wrapper = styled.div`
    background-color: #C63F3F;
    height: 70px;
    width: 500px;
    display: flex;

    button {
        margin: 10px;
    }
`;

export function CommandPanel() {
    return (
        <Wrapper>
            <CommandPanelButton text='Clear Canvas' id='clearCanvas'/>
        </Wrapper>
    );
}
