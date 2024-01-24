import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Color from 'colorjs.io';
import { ColorContext } from '../../contexts/color-context';
import { usePointer } from '../../hooks/use-pointer';
import { ColorPickerMarker } from './color-picker-marker';

const Wrapper = styled.div`
    background-color: #D32A2A;    
`;

const ColorPickerBody = styled.div`
    background-color: white;
    height: 350px;
    width: 350px;
    border: solid 1px #ccc;
    opacity: 100;
    padding: 5px;
    position: relative;
`;

// note that canvas ratio is set as attribute through the attribute itself
export const ColorPickerChild = styled.canvas`    
    position: absolute;
    z-index: 9999;
    width: 300px;
    height: 300px;
`;

const ColorCanvas = styled(ColorPickerChild)`
    z-index: 0;
    top: 5px;
    left: 5px;    
`;

const HueSelector = styled(ColorPickerChild)`
    z-index: 0;
    left: 305px;
    width: 30px;
`;

export interface Coord {
    x : number,
    y : number
}

export function ColorPicker() {
    const { color, updateColor } = useContext(ColorContext);
    const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [sliderCtx, setSliderCtx] = useState<CanvasRenderingContext2D | null>(null);
    const colorCanvasRef = useRef<HTMLCanvasElement>(null);
    const colorSliderRef = useRef<HTMLCanvasElement>(null);
    const colorSelectedRef = useRef<HTMLDivElement>(null);
    const { isDown: isColorDown, x: colorX, y: colorY } = usePointer(colorCanvasRef);
    const { y: hueY } = usePointer(colorSliderRef);

    function updateColorCanvas(hue: number) {
        if (!colorCanvasRef.current) return;

        const currCanvasCtx = colorCanvasRef.current.getContext('2d');
        if (!currCanvasCtx) {
            return;
        }

        setCanvasCtx(currCanvasCtx);
            
        const gradientH = currCanvasCtx.createLinearGradient(0, 0, currCanvasCtx.canvas.width, 0);
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, new Color('hsv', [hue, 100, 100]).to('srgb').toString());
        currCanvasCtx.fillStyle = gradientH;
        currCanvasCtx.fillRect(0, 0, currCanvasCtx.canvas.width, currCanvasCtx.canvas.height);

        const gradientV = currCanvasCtx.createLinearGradient(0, 0, 0, currCanvasCtx.canvas.height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, '#000');
        currCanvasCtx.fillStyle = gradientV;
        currCanvasCtx.fillRect(0, 0, currCanvasCtx.canvas.width, currCanvasCtx.canvas.height);
    }

    // set color canvas
    useEffect(() => {
        updateColorCanvas(color.hsv.h);
    }, [color]);

    // set color slider
    useEffect(() => {
        if (!colorSliderRef.current) return;

        const currSliderCtx = colorSliderRef.current.getContext('2d');
        if (!currSliderCtx) {
            return;
        }

        setSliderCtx(currSliderCtx);
            
        const gradient = currSliderCtx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradient.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        gradient.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        gradient.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
        currSliderCtx.fillStyle = gradient;
        currSliderCtx.fillRect(0, 0, currSliderCtx.canvas.width, currSliderCtx.canvas.height); 
    }, []);

    // calculate selected color
    useEffect(() => {
        if (!isColorDown || !colorCanvasRef.current) return;

        const saturation = colorX / colorCanvasRef.current.width;
        const value = colorY / colorCanvasRef.current.height;        
        const newColor = new Color('hsv', [color.hsl.h, saturation * 100, (1 - value) * 100]);                
        updateColor(newColor);

        // update selected color tile
        if (!colorSelectedRef.current) return;
        colorSelectedRef.current.style.backgroundColor = newColor.to('srgb').toString();
    }, [colorX, colorY]);

    function sliderClick() {
        if (!colorSliderRef.current) return;

        // set color chosen
        const newHue = (hueY / colorSliderRef.current.height) * 360;
        const newColor = new Color(color);
        newColor.hsv.h = newHue;
        updateColor(newColor);

        // update selected color tile
        if (!colorSelectedRef.current) return;
        colorSelectedRef.current.style.backgroundColor = newColor.to('srgb').toString();
    }

    return (
        <Wrapper>
            <div>
                <div style={{width: 100, height: 30}} ref={colorSelectedRef}></div>
                <ColorPickerBody>                                       
                    <ColorPickerMarker canvasHeight={colorCanvasRef.current?.height} coordX={colorX} coordY={colorY}/>
                    <ColorCanvas ref={colorCanvasRef} width='300px' height='300px'/>                    
                    <HueSelector ref={colorSliderRef} onClick={sliderClick} height="300" width="30"/>
                </ColorPickerBody>
            </div>
        </Wrapper>
    );
}
