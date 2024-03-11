import React, { useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import Color from 'colorjs.io';
import { usePointer } from '../../utils/use-pointer';

const CANVAS_SIZE_PX = 300;
const HUE_SELECTOR_WIDTH_PX = 30;

const ColorPickerBody = styled.div`
    display: flex;
    background-color: #f5f5f5;
    height: 310px;
    width: 340px;
    border-radius: 8px;
    padding: 5px;
    box-sizing: border-box;
`;

const CanvasContainer = styled.div`
    position: relative;
    overflow: hidden;
`;

const Canvas = styled.canvas`
    display: block;
    position: relative;

    &:hover {
        cursor: crosshair;
    }
`;

const Marker = styled.span`
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-radius: 9999999px;
`;

interface ColorPickerProps {
    color : Color;
    onChange : (newColor : Color) => void;
}

export function ColorPicker({ color, onChange } : ColorPickerProps) {
    const colorCanvasRef = useRef<HTMLCanvasElement>(null);
    const hueCanvasRef = useRef<HTMLCanvasElement>(null);
    const { isDown: isColorDown, x: colorX, y: colorY } = usePointer(colorCanvasRef);
    const { isDown: isHueDown, y: hueY } = usePointer(hueCanvasRef);

    // Set up hue picker canvas
    useEffect(() => {
        const hueCtx = hueCanvasRef.current?.getContext('2d');
        if (!hueCtx) {
            return;
        }

        const gradient = hueCtx.createLinearGradient(0, 0, 0, CANVAS_SIZE_PX);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
        hueCtx.fillStyle = gradient;
        hueCtx.fillRect(0, 0, hueCtx.canvas.width, hueCtx.canvas.height); 
    }, []);

    // Set up color picker canvas
    useEffect(() => {
        const colorCtx = colorCanvasRef.current?.getContext('2d');
        if (!colorCtx) {
            return;
        }

        // Draw color gradient
        const gradientH = colorCtx.createLinearGradient(0, 0, colorCtx.canvas.width, 0);
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, new Color('hsv', [color.hsv.h, 100, 100]).to('srgb').toString());
        colorCtx.fillStyle = gradientH;
        colorCtx.fillRect(0, 0, colorCtx.canvas.width, colorCtx.canvas.height);
        const gradientV = colorCtx.createLinearGradient(0, 0, 0, colorCtx.canvas.height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, '#000');
        colorCtx.fillStyle = gradientV;
        colorCtx.fillRect(0, 0, colorCtx.canvas.width, colorCtx.canvas.height);
    }, [color]);

    // Handle pointer in hue slider
    useEffect(() => {
        if ((!isColorDown && !isHueDown) || !colorCanvasRef.current || !hueCanvasRef.current) {
            return;
        }

        const hue = isHueDown ? (hueY / hueCanvasRef.current.height) * 360 : color.hsv.h;
        const saturation = isColorDown ? colorX / colorCanvasRef.current.width * 100 : color.hsv.s;
        const value = isColorDown ? ( 1 - (colorY / colorCanvasRef.current.height)) * 100 : color.hsv.v;
        const newColor = new Color('hsv', [hue, saturation, value]);

        onChange(newColor);
    }, [isColorDown, colorX, colorY, isHueDown, hueY]);

    return (
        <div>
            <ColorPickerBody>
                <CanvasContainer style={{width: `${CANVAS_SIZE_PX}`, height: `${CANVAS_SIZE_PX}`}}>
                    <Canvas ref={colorCanvasRef} width={`${CANVAS_SIZE_PX}px`} height={`${CANVAS_SIZE_PX}px`}/>
                    <Marker
                        style={{
                            transform: `translate(-50%, -50%) translate(${color.hsv.s / 100 * CANVAS_SIZE_PX}px, ${(1 - (color.hsv.v / 100)) * CANVAS_SIZE_PX}px)`,
                            border: `1px solid ${color.hsv.v < 50 ? 'white' : 'black'}`,
                        }}
                    />
                </CanvasContainer>
                <CanvasContainer>
                    <Canvas ref={hueCanvasRef} height={`${CANVAS_SIZE_PX}px`} width={`${HUE_SELECTOR_WIDTH_PX}px`}/>
                    <Marker
                        style={{
                            left: HUE_SELECTOR_WIDTH_PX / 2,
                            transform: `translate(-50%, -50%) translateY(${color.hsv.h / 360 * CANVAS_SIZE_PX}px)`,
                            border: '1px solid black',
                        }}
                    />
                </CanvasContainer>
            </ColorPickerBody>
        </div>
    );
}
