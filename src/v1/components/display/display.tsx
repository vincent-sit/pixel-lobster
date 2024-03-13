import React from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #D9D9D9;
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

export interface DisplayProps {
    onWheel : (e : React.WheelEvent) => void,
    children: React.ReactNode,
}

export function Display({ onWheel: onWheel, children } : DisplayProps) {
    return (
        <Wrapper onWheel={onWheel}>
            {children}
        </Wrapper>
    );
}
