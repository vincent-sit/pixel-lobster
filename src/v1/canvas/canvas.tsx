import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BackgroundLayer } from './background-layer';
import { useSnapshot } from 'valtio';
import { DisplayState } from '../display/model';

const Container = styled.div`
    transform-origin: center;
    position: absolute;
    left: 50%;
    top: 50%;
`;

export interface CanvasProps extends LayerProps {
    canvas: HTMLCanvasElement
}

export interface LayerProps {
    width: number,
    height: number
}

export function Canvas({
    canvas,
    width,
    height,
}: CanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const snapshot = useSnapshot(DisplayState);

    useEffect(() => {
        containerRef.current?.append(canvas);

        return () => {
            containerRef.current?.removeChild(canvas);
        };
    }, [canvas]);

    return (
        <Container ref={containerRef} style={{transform: `scale(${snapshot.store.zoomFactor})`, width: width, height : height}}>
            <BackgroundLayer width={width} height={height}/>
        </Container>
    );
}
