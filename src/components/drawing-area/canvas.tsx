import React, { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../contexts/color-context';
import { usePointer } from '../../hooks/use-pointer';
import { ColorHistoryContext } from '../../contexts/color-history-context';

const COLOR_HISTORY_LIMIT = 20;

const CanvasContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
`;

const CenteredCanvas = styled.canvas`
    margin-top: 0;
    grid-column: 1;
    grid-row: 1;

    &:hover {
        cursor: crosshair;
    }
`;

const Marker = styled.span`
    position: absolute;
    visibility: hidden;
    grid-column: 1;
    grid-row: 1;
    pointer-events: none;

    &:hover {
        cursor: crosshair;
    }
`;

interface DisplayProps {
    zoomFactor : number
}

export function Canvas(props: DisplayProps) {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const backgroundRef = useRef<HTMLCanvasElement>(null);
    const markerRef = useRef<HTMLSpanElement>(null);
    const displayRef = useRef<HTMLDivElement>(null);
    const { isDown, x: pointerX, y: pointerY } = usePointer(canvasRef);
    const { color } = useContext(ColorContext);

    useEffect(() => {
        if (!canvasRef.current || !backgroundRef.current) return;

        const currCtx = canvasRef.current.getContext('2d');
        const backgroundCtx = backgroundRef.current.getContext('2d');
        if (currCtx) {
            setCtx(currCtx);
            currCtx.fillStyle = 'rgba(0,0,0,0)';
            currCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        if (backgroundCtx) {
            const colorOne = 'rgba(138, 138, 138, 1)';
            const colorTwo = 'rgba(199, 199, 199, 1)';
            let isMainColor = true;
            for (let i = 0; i < 16; i++) {
                // if even, flip j
                isMainColor = !isMainColor;
                for (let j = 0; j < 16; j++) {
                    backgroundCtx.fillStyle = isMainColor ? colorOne : colorTwo;
                    backgroundCtx.fillRect(i, j, 1, 1);
                    isMainColor = !isMainColor;
                }
            }
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current || !displayRef.current || !markerRef.current || !backgroundRef.current) return;
        displayRef.current.style.transform = `scale(${props.zoomFactor})`;
    }, [props.zoomFactor]);

    function handleHover(e : React.MouseEvent<HTMLCanvasElement>) {
        if (!markerRef.current || !ctx || !canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        markerRef.current.style.visibility = 'visible';
        markerRef.current.style.top = `${Math.floor((e.clientY - rect.y) / props.zoomFactor)}px`;
        markerRef.current.style.left = `${Math.floor((e.clientX - rect.x) / props.zoomFactor)}px`;
    }

    function handleLeave() {
        if (!markerRef.current) return;
        markerRef.current.style.visibility = 'hidden';
    }

    function handleMove() {
        if (!isDown || !ctx || !canvasRef.current) return;
        ctx.fillStyle = color.to('srgb').toString();        
        ctx.fillRect(Math.floor(pointerX / props.zoomFactor), Math.floor(pointerY / props.zoomFactor), 1, 1);        
    }

    function handleUp() {
        if (!isDown || !ctx || !canvasRef.current) return;
        const currentColorString = color.to('srgb').toString();
        ctx.fillStyle = currentColorString;
        ctx.fillRect(Math.floor(pointerX / props.zoomFactor), Math.floor(pointerY / props.zoomFactor), 1, 1);        
        const colorSearchResult = colorHistory.find((element) => element.to('srgb').toString() === currentColorString);
        if (colorHistory.length > COLOR_HISTORY_LIMIT) {
            colorHistory.splice(0, 1);            
        }
        if (!colorSearchResult) {
            setColorHistory([
                ...colorHistory,
                color
            ]);
        }
    }

    return (
        <CanvasContainer ref={displayRef}>
            <Marker 
                ref={markerRef} 
                style={{ 
                    backgroundColor: `${color.to('srgb').toString()}`,
                    width: '1px',
                    height: '1px',
                    zIndex: 99}}
            />
            <CenteredCanvas 
                ref={canvasRef}
                id='drawing-canvas'
                width="16" height="16"
                style={{imageRendering: 'pixelated', zIndex:3}}
                onPointerMove={handleMove}
                onPointerUp={handleMove}
                onMouseMove={handleHover}
                onMouseLeave={handleLeave}
            />
            <CenteredCanvas
                id='canvas-background'
                width="16" height="16"
                ref={backgroundRef}
                style={{imageRendering: 'pixelated', zIndex:2}}
            />
        </CanvasContainer>
    );
}
