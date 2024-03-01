import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BackgroundLayer } from './background-layer';
import { useSnapshot } from 'valtio';
import { DisplayState } from '../display/model';

const Container = styled.div`
    transform-origin: center;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
`;

const InnerCanvas = styled.div`
    position: relative;
`;

export interface CanvasProps extends LayerProps {
    canvas: HTMLCanvasElement,
    marker : HTMLSpanElement,
    // eslint-disable-next-line no-unused-vars
    onMouseMove : (e : PointerEvent) => void,
    onMouseLeave : () => void,
}

export interface LayerProps {
    width: number,
    height: number
}

export function Canvas({
    canvas,
    width,
    height,
    marker,
    onMouseMove,
    onMouseLeave
}: CanvasProps) {
    const innerCanvasRef = useRef<HTMLDivElement>(null);
    const snapshot = useSnapshot(DisplayState);
    marker.style.backgroundColor = 'white';

    useEffect(() => {
        innerCanvasRef.current?.addEventListener('pointermove', onMouseMove);
        innerCanvasRef.current?.addEventListener('pointerleave', onMouseLeave);
        innerCanvasRef.current?.addEventListener('pointerdown', onMouseMove);
        innerCanvasRef.current?.append(canvas);
        innerCanvasRef.current?.append(marker);

        return () => {
            innerCanvasRef.current?.removeEventListener('pointermove', onMouseMove);
            innerCanvasRef.current?.removeEventListener('pointerleave', onMouseLeave);
            innerCanvasRef.current?.removeEventListener('pointerdown', onMouseMove);
            innerCanvasRef.current?.removeChild(canvas);
            innerCanvasRef.current?.removeChild(marker);
        };
    }, [canvas]);

    return (
        <Container style={{transform: `scale(${snapshot.store.zoomFactor})`, width: width, height: height}}>
            <InnerCanvas ref={innerCanvasRef} style={{width: width, height: height}}>
                <BackgroundLayer width={width} height={height}/>
            </InnerCanvas>
        </Container>
    );
}
