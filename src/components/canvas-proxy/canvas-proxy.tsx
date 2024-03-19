import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BackgroundLayer } from './background-layer';
import Color from 'colorjs.io';
import { Tool } from '../tool/types';

const Marker = styled.span`
    width: 1px;
    height: 1px;
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    top: 0;
    left: 0;
    z-index: 1;

    &:hover {
        cursor: crosshair;
    }
`;

export interface CanvasProxyProps {
    canvas: HTMLCanvasElement;
    getColor: () => Color;
    getZoomFactor: () => number;
    getTool: () => Tool;
}

export function CanvasProxy({
    canvas,
    getColor,
    getZoomFactor,
    getTool,
}: CanvasProxyProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const container = containerRef.current;
        container.append(canvas);

        return () => {
            container.removeChild(canvas);
        };
    }, [canvas]);

    function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
        const rect = canvas.getBoundingClientRect();
        const zoomFactor = getZoomFactor();
        const x = Math.floor((e.clientX - rect.x) / zoomFactor);
        const y = Math.floor((e.clientY - rect.y) / zoomFactor);
        getTool().down?.(x, y);
    }

    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
        if (!markerRef.current) return;
        if (getTool().type === 'paint-brush')
            markerRef.current.style.visibility = 'visible';
        const rect = canvas.getBoundingClientRect();
        const zoomFactor = getZoomFactor();
        const x = Math.floor((e.clientX - rect.x) / zoomFactor);
        const y = Math.floor((e.clientY - rect.y) / zoomFactor);

        markerRef.current.style.top = y + 'px';
        markerRef.current.style.left = x + 'px';
        markerRef.current.style.backgroundColor = getColor()
            .to('srgb')
            .toString();
        if (e.pressure > 0) {
            getTool().move?.(x, y);
        }
    }

    function handlePointerLeave() {
        if (!markerRef.current) return;
        markerRef.current.style.visibility = 'hidden';
    }

    return (
        <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
        >
            <BackgroundLayer />
            <Marker ref={markerRef} />
        </div>
    );
}
