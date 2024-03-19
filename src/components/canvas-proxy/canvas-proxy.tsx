import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BackgroundLayer } from './background-layer';
import Color from 'colorjs.io';
import { Tool } from '../tool/types';
import { usePointer } from '../../base/use-pointer';
import { Operation } from '../operation-history/type';
import { EraseOperation } from '../operation-history/erase/operation';
import { PaintOperation } from '../operation-history/paint/operation';

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
    getTool
}: CanvasProxyProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<HTMLSpanElement>(null);
    const prevIsDown = useRef(false);
    const { isDown, x: pointerX, y: pointerY } = usePointer(containerRef);

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

    // Handle marker
    useEffect(() => {
        if (!markerRef.current) return;

        const rect = canvas.getBoundingClientRect();
        if (
            getTool().type === 'paint-brush' &&
            pointerX >= 0 &&
            pointerX < rect.width &&
            pointerY >= 0 &&
            pointerY < rect.height
        ) {
            markerRef.current.style.visibility = 'visible';
        } else {
            markerRef.current.style.visibility = 'hidden';
            return;
        }
        const zoomFactor = getZoomFactor();
        const x = Math.floor(pointerX / zoomFactor);
        const y = Math.floor(pointerY / zoomFactor);

        markerRef.current.style.top = y + 'px';
        markerRef.current.style.left = x + 'px';
        markerRef.current.style.backgroundColor = getColor()
            .to('srgb')
            .toString();
    }, [pointerX, pointerY, canvas, getTool, getZoomFactor, getColor]);

    // Handle pointer interactions
    useEffect(() => {
        const zoomFactor = getZoomFactor();
        const x = Math.floor(pointerX / zoomFactor);
        const y = Math.floor(pointerY / zoomFactor);
        const tool = getTool();
        if (isDown !== prevIsDown.current) {
            if (isDown) tool.down(x, y);
            else tool.up(x, y);
            prevIsDown.current = isDown;
        } else if (isDown) {
            tool.move(x, y);
        }
    }, [isDown, pointerX, pointerY, canvas, getZoomFactor, getTool]);

    return (
        <div ref={containerRef}>
            <BackgroundLayer />
            <Marker ref={markerRef} />
        </div>
    );
}
