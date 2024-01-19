import React, { useRef, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../contexts/color-context';
import { IsPointerDownContext } from '../../contexts/is-pointer-down-context';

interface WrapperProps {
    w: string;
    h : string;
    scaleFactor : string;
}

const dimensions : WrapperProps = {
    w: '16',
    h: '16',
    scaleFactor: '10'
};

const Wrapper = styled.div`
  background-color: #924C4C;
`;

export function Canvas() {
    const {isPointerDown} = useContext(IsPointerDownContext);
    const {color} = useContext(ColorContext);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // set up canvas on first load
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

    function handlePointerInteract(e: React.PointerEvent<HTMLCanvasElement>) {                 
        if (!isPointerDown || !ctx || !canvasRef.current) {
            return;
        }

        const rect = canvasRef.current.getBoundingClientRect();
        ctx.fillStyle = color;
        ctx.fillRect(e.clientX - rect.x, e.clientY - rect.y, 10, 10);
    }

    return (
        <Wrapper>
            <canvas ref={canvasRef} width="100" height="100" onPointerUp={handlePointerInteract} onPointerMove={handlePointerInteract}></canvas>
        </Wrapper>
    );
}
