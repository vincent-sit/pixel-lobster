import React from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
    background-color: #D9D9D9;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
`;

export interface DisplayProps {
    onWheel : (e : React.WheelEvent) => void,
    Canvas : React.ComponentType
}

export function Display({ onWheel: onWheel, Canvas } : DisplayProps) {
    return (
        <Wrapper onWheel={onWheel}>
            <Canvas/>
        </Wrapper>
    );
}
