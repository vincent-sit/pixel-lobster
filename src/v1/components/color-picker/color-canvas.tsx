import React, { useRef, useEffect } from 'react';
import { ColorState } from './state';
import { styled } from 'styled-components';

const ColorContainer = styled.div`
`;

interface ColorCanvasProps {
    state : ColorState,
    canvas : HTMLCanvasElement
}

export function ColorCanvas({state, canvas} : ColorCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        containerRef.current?.append(canvas);

        return () => {
            containerRef.current?.removeChild(canvas);
        };
    }, [canvas]);

    return (
        <ColorContainer ref={containerRef}>
        </ColorContainer>
    );
}
