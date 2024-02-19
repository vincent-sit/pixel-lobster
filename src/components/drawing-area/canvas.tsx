import React, { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../contexts/color-context';
import { usePointer } from '../../hooks/use-pointer';
import { ColorHistoryContext } from '../../contexts/color-history-context';

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
    const markerRef = useRef<HTMLSpanElement>(null);
    const displayRef = useRef<HTMLDivElement>(null);
    const { isDown, x: pointerX, y: pointerY } = usePointer(canvasRef);    
    const { color } = useContext(ColorContext);
    const { colors: colorHistory, updateColors : setColorHistory } = useContext(ColorHistoryContext);

    useEffect(() => {
        if (!canvasRef.current) return;

        const currCtx = canvasRef.current.getContext('2d');
        if (currCtx) {
            setCtx(currCtx);
            currCtx.fillStyle = 'blue';
            currCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current || !displayRef.current || !markerRef.current) return;        
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
        ctx.fillStyle = color.to('srgb').toString();        
        ctx.fillRect(Math.floor(pointerX / props.zoomFactor), Math.floor(pointerY / props.zoomFactor), 1, 1);        
        setColorHistory([
            ...colorHistory,
            color
        ]);
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
            <CenteredCanvas ref={canvasRef}
                width="16" height="16"
                style={{imageRendering: 'pixelated'}}
                onPointerMove={handleMove}
                onPointerUp={handleUp}
                onMouseMove={handleHover}
                onMouseLeave={handleLeave}
            />
        </CanvasContainer>
    );
}
