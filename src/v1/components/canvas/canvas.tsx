import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BackgroundLayer } from './background-layer';
import { useSnapshot } from 'valtio';
import { DisplayState } from '../display/model';
import { CanvasPresenter } from './presenter';
import { ColorState } from '../color-picker/model';
import { ResizeState } from '../resize/model';

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

export interface CanvasProps {
    canvas: HTMLCanvasElement,
    marker : HTMLSpanElement,
    presenter : CanvasPresenter
}

export function Canvas({ canvas, marker, presenter }: CanvasProps) {
    const innerCanvasRef = useRef<HTMLDivElement>(null);
    const display = useSnapshot(DisplayState).store;
    const resize = useSnapshot(ResizeState).store;

    const mouseMove = (e : PointerEvent) => {
        presenter.onMouseMove(e, ColorState.store.currentColor, DisplayState.store.zoomFactor);
    };

    useEffect(() => {
        innerCanvasRef.current?.addEventListener('pointermove', mouseMove);
        innerCanvasRef.current?.addEventListener('pointerleave', () => presenter.onMouseLeave());
        innerCanvasRef.current?.addEventListener('pointerdown', mouseMove);
        innerCanvasRef.current?.append(canvas);
        innerCanvasRef.current?.append(marker);

        return () => {
            innerCanvasRef.current?.removeEventListener('pointermove', mouseMove);
            innerCanvasRef.current?.removeEventListener('pointerleave', () => presenter.onMouseLeave());
            innerCanvasRef.current?.removeEventListener('pointerdown', mouseMove);
            innerCanvasRef.current?.removeChild(canvas);
            innerCanvasRef.current?.removeChild(marker);
        };
    }, [canvas, marker]);

    return (
        <Container style={{transform: `scale(${display.zoomFactor})`, width: resize.width, height: resize.height}}>
            <InnerCanvas ref={innerCanvasRef} style={{width: resize.width, height: resize.height}}>
                <BackgroundLayer width={resize.width} height={resize.height}/>
            </InnerCanvas>
        </Container>
    );
}
