import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BackgroundLayer } from './background-layer';

const Container = styled.div`
    transform-origin: center;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
`;

const Marker = styled.span`
    width: 1px;
    height: 1px;
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 1;

    &:hover {
        cursor: crosshair;
    }
`;

export interface CanvasProps {
    canvas: HTMLCanvasElement,
    zoomFactor : number,
    width: number,
    height : number,
}

export function Canvas({ canvas, zoomFactor, width, height }: CanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        containerRef.current?.append(canvas);

        return () => {
            containerRef.current?.removeChild(canvas);
        };
    }, [canvas]);

    function handlePointerMove(e : React.PointerEvent<HTMLDivElement>) {
        if (!markerRef.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        markerRef.current.style.visibility = 'visible';
        markerRef.current.style.top = `${Math.floor((e.clientY - rect.y) / zoomFactor)}px`;
        markerRef.current.style.left = `${Math.floor((e.clientX - rect.x) / zoomFactor)}px`;
    }

    function handlePointerLeave() {
        if (!markerRef.current) return;
        markerRef.current.style.visibility = 'hidden';
    }

    return (
        <Container 
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{transform: `scale(${zoomFactor})`, width: width, height: height}}
        >
            <BackgroundLayer width={width} height={height}/>
            <Marker ref={markerRef}/>
        </Container>
    );
}
