import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ColorPickerPresenter } from './presenter';
import { ColorState } from './model';

const Container = styled.div`
    display: flex;
`;

const ColorCanvas = styled.div`
    position: relative;
    overflow: hidden;
`;

const HueCanvas = styled.div`
    position: relative;
    overflow: hidden;
`;

export interface ColorPickerProps {
    colorCanvas : HTMLCanvasElement,
    hueCanvas : HTMLCanvasElement,
    colorMarker : HTMLSpanElement,
    hueMarker : HTMLSpanElement,
    presenter : ColorPickerPresenter
}

export function ColorPickerMainBody({colorCanvas, hueCanvas, colorMarker, hueMarker, presenter} : ColorPickerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const colorCanvasRef = useRef<HTMLDivElement>(null);
    const hueCanvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        colorCanvasRef.current?.append(colorCanvas);
        colorCanvasRef.current?.append(colorMarker);
        hueCanvasRef.current?.append(hueCanvas);
        hueCanvasRef.current?.append(hueMarker);

        colorMarker.style.top = '0px';
        colorMarker.style.left = '0px';

        hueMarker.style.top = '0px';
        hueMarker.style.left = ColorState.store.HUE_WIDTH / 2 + 'px';

        document.body.addEventListener('pointerdown', (e) => presenter.handleDown(e));
        document.body.addEventListener('pointermove', (e) => presenter.handleMove(e));
        document.body.addEventListener('pointerup', () => presenter.handleUp());

        return () => {
            colorCanvasRef.current?.removeChild(colorCanvas);
            colorCanvasRef.current?.removeChild(colorMarker);
            hueCanvasRef.current?.removeChild(hueCanvas);
            hueCanvasRef.current?.removeChild(hueMarker);

            document.body.addEventListener('pointerdown', (e) => presenter.handleDown(e));
            document.body.addEventListener('pointermove', (e) => presenter.handleMove(e));
            document.body.addEventListener('pointerup', () => presenter.handleUp());
        };

    }, []);

    return (
        <Container ref={containerRef}>
            <ColorCanvas ref={colorCanvasRef} style={{width: ColorState.store.CANVAS_SIZE, height: ColorState.store.CANVAS_SIZE}}/>
            <HueCanvas ref={hueCanvasRef} style={{width: ColorState.store.HUE_WIDTH, height: ColorState.store.CANVAS_SIZE}}/>
        </Container>
    );
}
