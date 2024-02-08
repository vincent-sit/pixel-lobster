import React, { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../contexts/color-context';
import { usePointer } from '../../hooks/use-pointer';
import { useScroller } from '../../hooks/use-scroller';

const Wrapper = styled.div`
    background-color: #5a546a;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const CenteredCanvas = styled.canvas`
    margin: auto;
`;

export function Canvas() {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const displayRef = useRef<HTMLDivElement>(null);
    const { isDown, x: pointerX, y: pointerY } = usePointer(canvasRef);
    const { zoomFactor} = useScroller(displayRef);
    const { color } = useContext(ColorContext);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const currCtx = canvasRef.current.getContext('2d');
        if (currCtx) {
            setCtx(currCtx);
            currCtx.fillStyle = 'blue';
            currCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;        
        canvasRef.current.style.transform = `scale(${zoomFactor})`;
    }, [zoomFactor]);

    function handleMove() {
        if (!isDown || !ctx || !canvasRef.current) {
            return;
        }

        ctx.fillStyle = color.to('srgb').toString();
        ctx.fillRect(Math.floor(pointerX / zoomFactor), Math.floor(pointerY / zoomFactor), 1, 1);
    }

    return (
        <Wrapper ref={displayRef}>
            <CenteredCanvas ref={canvasRef} 
                width="16" height="16" 
                style={{imageRendering: 'pixelated'}} 
                onPointerMove={handleMove} 
                onPointerUp={handleMove}
            />
        </Wrapper>
    );
}
