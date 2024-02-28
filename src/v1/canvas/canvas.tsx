import React, { useEffect, useId, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    transform-origin: center;
    position: relative;
    transform: scale(300%);
`;

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`;

type CanvasProps = {
    canvas: HTMLCanvasElement,
    width: number,
    height: number
};

export function Canvas({
    canvas,
    width,
    height,
}: CanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const patternId = useId();

    useEffect(() => {
        containerRef.current?.append(canvas);

        return () => {
            containerRef.current?.removeChild(canvas);
        };
    }, [canvas]);

    return (
        <Container ref={containerRef}>
            <Background>
                <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id={patternId} x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="1" height="1" fill="rgba(138, 138, 138, 1)" />
                            <rect x="1" y="1" width="1" height="1" fill="rgba(138, 138, 138, 1)" />
                        </pattern>
                    </defs>

                    <rect fill="rgba(199, 199, 199, 1)" width={width} height={height} />
                    <rect fill={`url(#${patternId})`} width={width} height={height} />
                </svg>
            </Background>
        </Container>
    );
}
