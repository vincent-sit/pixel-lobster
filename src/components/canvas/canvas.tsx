import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #924C4C;
  width: 512px;
  height: 512px;
`;

export function Canvas() {
    const [isDown, setIsDown] = useState(false);
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

    function handleDown() {
        setIsDown(true);
    }

    function handleUp() {
        setIsDown(false);
    }

    function handleMove(e: React.PointerEvent<HTMLCanvasElement>) {
        if (!isDown || !ctx || !canvasRef.current) {
            return;
        }

        const rect = canvasRef.current.getBoundingClientRect();
        ctx.fillStyle = 'black';
        ctx.fillRect(e.clientX - rect.x, e.clientY - rect.y, 1, 1);
    }

    return (
        <Wrapper>
            <canvas ref={canvasRef} width="300" height="300" onPointerDown={handleDown} onPointerUp={handleUp} onPointerMove={handleMove}></canvas>
        </Wrapper>
    );
}
