import React, { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../contexts/color-context';
import { IsPointerDownContext } from '../../contexts/is-pointer-down-context';

const Wrapper = styled.div`
  background-color: #924C4C;
  width: 512px;
  height: 512px;
`;

export function Canvas() {
    const {isPointerDown} = useContext(IsPointerDownContext);
    const {color} = useContext(ColorContext);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

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

    function handleMove(e: React.PointerEvent<HTMLCanvasElement>) {
        if (!isPointerDown || !ctx || !canvasRef.current) {
            return;
        }

        const rect = canvasRef.current.getBoundingClientRect();
        ctx.fillStyle = color;
        ctx.fillRect(e.clientX - rect.x, e.clientY - rect.y, 10, 10);
    }

    return (
        <Wrapper>
            <canvas ref={canvasRef} width="300" height="300" onPointerUp={handleMove} onPointerMove={handleMove}></canvas>
        </Wrapper>
    );
}
