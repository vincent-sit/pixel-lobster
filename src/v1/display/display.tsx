import React, { useRef, useEffect } from 'react';
import { styled } from 'styled-components';

const Wrapper = styled.div`
    background-color: #D9D9D9;
    height: 100%;
    width: 100%;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    overflow: hidden;
    transform-origin: center;
    position: relative;
`;

export interface DisplayProps {
    zoomFactor : number,
    // eslint-disable-next-line no-unused-vars
    onScroll : (e : WheelEvent) => void,
    Canvas : React.ComponentType,
    Display : HTMLDivElement
}

export function Display({onScroll, Canvas, Display} : DisplayProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        containerRef.current?.append(Display);
        containerRef.current?.addEventListener('wheel', onScroll);

        return () => {
            containerRef.current?.removeChild(Display);
            containerRef.current?.removeEventListener('wheel', onScroll);
        };

    }, [onScroll]);

    return (
        <Wrapper ref={containerRef}>
            <Canvas/>
        </Wrapper>
    );

}
