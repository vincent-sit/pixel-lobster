import React from 'react';
import styled from 'styled-components';
import { Canvas } from '../canvas/canvas';
import { CommandPanel } from '../command-panel/Command-Panel';

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
`;

export function Display() {
    return (
        <Wrapper>            
            <CommandPanelWrapper>
                <CommandPanel/>
            </CommandPanelWrapper>
            <Canvas></Canvas>
        </Wrapper>
    );
}
