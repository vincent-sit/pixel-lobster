import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ColorPickerPresenter } from './presenter';
import { ColorState } from './model';
import { clamp } from '../../../utils/math';
import Color from 'colorjs.io';

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
        presenter.createHueSlider(ColorState.store.CANVAS_SIZE);
        presenter.updateColorCanvas(ColorState.store.currentColor.hsv.h);
    }, []);

    useEffect(() => {
        colorCanvasRef.current?.append(colorCanvas);
        colorCanvasRef.current?.append(colorMarker);
        hueCanvasRef.current?.append(hueCanvas);
        hueCanvasRef.current?.append(hueMarker);

        function moveColorMarker(e : PointerEvent) {
            const rect = colorCanvas.getBoundingClientRect();
            ColorState.store.currentColor = new Color('red');
            if (e.pressure > 0) {
                const newX = clamp(e.clientX - rect.x, 0, rect.width);
                const newY = clamp(e.clientY - rect.y, 0, rect.height);
                colorMarker.style.transform = 
                    `translate(${newX}px, ${newY}px) translate(-50%, -50%)`;
            }
        }
        const rect = colorCanvas.getBoundingClientRect();
        colorMarker.style.top = rect.top + 'px';
        colorMarker.style.left = rect.left + 'px';

        colorCanvas.addEventListener('pointerdown', moveColorMarker);
        colorCanvas.addEventListener('pointermove', moveColorMarker);

        return () => {
            colorCanvasRef.current?.removeChild(colorCanvas);
            colorCanvasRef.current?.removeChild(colorMarker);
            hueCanvasRef.current?.removeChild(hueCanvas);
            hueCanvasRef.current?.removeChild(hueMarker);
            colorCanvas.removeEventListener('pointerdown', (e) => moveColorMarker(e));
            colorCanvas.removeEventListener('pointermove', (e) => moveColorMarker(e));
        };
        
    }, []);

    return (
        <Container ref={containerRef}>
            <ColorCanvas ref={colorCanvasRef}/>
            <HueCanvas ref={hueCanvasRef}/>
        </Container>
    );
}
