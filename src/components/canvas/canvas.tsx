import React, { useRef, useState, useEffect, useContext } from 'react';
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
        ctx.fillRect(pointerX, pointerY, 10, 10);
    }

    function handleUp() {
        if (!isDown || !ctx || !canvasRef.current) {
            return;
        }

        ctx.fillStyle = color.to('srgb').toString();
        ctx.fillRect(pointerX, pointerY, 10, 10);
    }

    return (
        <Wrapper>
            <canvas ref={canvasRef} width="300" height="300" onPointerMove={handleMove} onPointerUp={handleUp}></canvas>
        </Wrapper>
    );
}
