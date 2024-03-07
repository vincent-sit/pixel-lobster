import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BackgroundLayer } from './background-layer';
import { toolType } from '../tool/state';
import Color from 'colorjs.io';

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
    z-index: 1;

    &:hover {
        cursor: crosshair;
    }
`;

export interface CanvasProxyProps {
    canvas: HTMLCanvasElement,
    zoomFactor : number,
    color : Color,
    width: number,
    height : number,
    draw : (x : number, y : number, color : string) => void,
    erase : (x : number, y : number) => void,
    pick : (x : number, y : number, canvas : HTMLCanvasElement) => void,
    addToColorHistory : (newColor : Color) => void,
    tool : toolType
}

export function CanvasProxy({ canvas, zoomFactor, color, width, height, draw, erase, pick, addToColorHistory, tool }: CanvasProxyProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        containerRef.current?.append(canvas);

        return () => {
            containerRef.current?.removeChild(canvas);
        };
    }, [canvas]);

    function handlePointerDown(e : React.PointerEvent<HTMLDivElement>) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.x) / zoomFactor);
        const y = Math.floor((e.clientY - rect.y) / zoomFactor);
        switch(tool) {
            case 'paintbrush':
                draw(x, y, color.to('srgb').toString());
                addToColorHistory(color);
                break;
            case 'eraser':
                erase(x, y);
                break;
            case 'colorpicker':
                pick(x, y, canvas);
                break;
            default:
                break;
        }
    }

    function handlePointerMove(e : React.PointerEvent<HTMLDivElement>) {
        if (!markerRef.current) return;
        if (tool === 'paintbrush') markerRef.current.style.visibility = 'visible';
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.x) / zoomFactor);
        const y = Math.floor((e.clientY - rect.y) / zoomFactor);

        markerRef.current.style.top = y + 'px';
        markerRef.current.style.left = x + 'px';
        markerRef.current.style.backgroundColor = color.to('srgb').toString();
        if (e.pressure > 0) {
            switch(tool) {
                case 'paintbrush':
                    draw(x, y, color.to('srgb').toString());
                    break;
                case 'eraser':
                    erase(x, y);
                    break;
                case 'colorpicker':
                    pick(x, y, canvas);
                    break;
                default:
                    break;
            }
        }
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
            onPointerDown={handlePointerDown}
            style={{transform: `scale(${zoomFactor})`, width: width, height: height}}
        >
            <BackgroundLayer width={width} height={height}/>
            <Marker ref={markerRef}/>
        </Container>
    );
}
