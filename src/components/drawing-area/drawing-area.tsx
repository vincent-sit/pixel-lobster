import React, { useRef } from 'react';
import styled from 'styled-components';
// import { ColorContext } from '../../contexts/color-context';
// import { usePointer } from '../../hooks/use-pointer';
// import { useScroller } from '../../hooks/use-scroller';
import { Canvas } from './canvas';
import { useScroller } from '../../hooks/use-scroller';

const Wrapper = styled.div`
    background-color: #5a546a;
    width: 100%;
    height: 100%;
    display: flex;
    //justify-content: center;
    position: relative;
    overflow: hidden;
`;

export function DrawingArea() {
    const displayRef = useRef<HTMLDivElement>(null);
    const {zoomFactor} = useScroller(displayRef);
    return (
        <Wrapper ref={displayRef}>
            <Canvas zoomFactor={zoomFactor}></Canvas>
        </Wrapper>
    );
}
