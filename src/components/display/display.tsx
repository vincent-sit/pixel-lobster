import React from 'react';
import styled from 'styled-components';
import { DrawingArea } from '../drawing-area/drawing-area';
import { CommandPanel } from '../command-panel/command-panel';

const Wrapper = styled.div`
    background-color: #D9D9D9;  
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const CommandPanelWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
`;

export function Display() {    
    return (
        <Wrapper>
            <CommandPanelWrapper>
                <CommandPanel/>
            </CommandPanelWrapper>
            <DrawingArea/>
        </Wrapper>
    );
}
