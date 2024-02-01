import React, { useRef, useState, useEffect, useContext, WheelEvent } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../contexts/color-context';
import { usePointer } from '../../hooks/use-pointer';

const Wrapper = styled.div`
  background-color: #924C4C;
  width: 512px;
  height: 512px;  
`;

export function Canvas() {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { isDown, x: pointerX, y: pointerY } = usePointer(canvasRef);
    const { color } = useContext(ColorContext);
    const [zoomFactor, setZoomFactor] = useState<number>(1);
    const scrollSpeed = 1;

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

    function handleMove() {
        if (!isDown || !ctx || !canvasRef.current) {
            return;
        }

        ctx.fillStyle = color.to('srgb').toString();
        ctx.fillRect(Math.floor(pointerX / zoomFactor), Math.floor(pointerY / zoomFactor), 1, 1);
    }

    function zoomOnScroll(e : WheelEvent<HTMLCanvasElement>) {
        if (!canvasRef.current) return;                

        if (e.deltaY < 0) {
            setZoomFactor(zoomFactor + scrollSpeed);
            canvasRef.current.style.transform = `scale(${zoomFactor})`;            
        } else {
            setZoomFactor(zoomFactor - scrollSpeed);
            canvasRef.current.style.transform = `scale(${zoomFactor})`;    
        }
    }

    return (
        <Wrapper>
            <canvas ref={canvasRef} width="16" height="16" style={{imageRendering: 'pixelated'}} onPointerMove={handleMove} onPointerUp={handleMove} onWheel={zoomOnScroll}></canvas>
        </Wrapper>
    );
}
