import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Color from 'colorjs.io';
import { ColorContext } from '../../contexts/color-context';
import { usePointer } from '../../hooks/use-pointer';
import { ColorHistory } from './color-history';

const CANVAS_SIZE_PX = 300;
const HUE_SELECTOR_WIDTH_PX = 30;

const Wrapper = styled.div`
    background-color: #D32A2A;    
`;

const ColorPickerBody = styled.div`
    display: flex;
    background-color: white;
    height: 325px;
    width: 325px;
    border: solid 1px #ccc;
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
    top: 0;
    left: 0;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 9999999px;
`;

export function ColorPicker() {
    const { color, updateColor } = useContext(ColorContext);
    const colorCanvasRef = useRef<HTMLCanvasElement>(null);
    const colorSliderRef = useRef<HTMLCanvasElement>(null);
    const colorSelectedRef = useRef<HTMLDivElement>(null);
    const { isDown: isColorDown, x: colorX, y: colorY } = usePointer(colorCanvasRef);
    const { isDown: isHueDown, y: hueY } = usePointer(colorSliderRef);

    function updateColorCanvas(hue: number) {
        if (!colorCanvasRef.current) return;

        const currCanvasCtx = colorCanvasRef.current.getContext('2d');
        if (!currCanvasCtx) {
            return;
        }        
            
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

    function adjustColor(newHue? : number) {
        if (!colorCanvasRef.current) return; 
        const saturation = colorX / colorCanvasRef.current.width;
        const value = colorY / colorCanvasRef.current.height;        
        const newColor = new Color('hsv', [color.hsl.h, saturation * 100, (1 - value) * 100]);
        if (newHue) newColor.hsv.h = newHue;
        return newColor;
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
            
        const gradient = currSliderCtx.createLinearGradient(0, 0, 0, CANVAS_SIZE_PX);
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

        const newColor = adjustColor()!;          
        updateColor(newColor);

        // update selected color tile
        if (!colorSelectedRef.current) return;
        colorSelectedRef.current.style.backgroundColor = newColor.to('srgb').toString();
    }, [colorX, colorY]);

    // calculate selected hue
    useEffect(() => {
        if (!isHueDown || !colorSliderRef.current || !colorCanvasRef.current) return;

        const newHue = (hueY / colorSliderRef.current.height) * 360;                            
        
        const newColor = adjustColor(newHue)!;        
        updateColor(newColor);        

        // update selected color tile
        if (!colorSelectedRef.current) return;
        colorSelectedRef.current.style.backgroundColor = newColor.to('srgb').toString();
    }, [hueY]);

    return (
        <Wrapper>
            <div style={{width: 100, height: 30}} ref={colorSelectedRef}></div>
            <ColorPickerBody>
                <CanvasContainer>
                    <Canvas ref={colorCanvasRef} width={`${CANVAS_SIZE_PX}px`} height={`${CANVAS_SIZE_PX}px`}/>
                    <Marker style={{ transform: `translate(${colorX}px, ${colorY}px) translate(-50%, -50%)`, border: `1px solid ${colorY > CANVAS_SIZE_PX / 2 ? 'white' : 'black'}` }}/>
                </CanvasContainer>
                <CanvasContainer>
                    <Canvas ref={colorSliderRef} height={`${CANVAS_SIZE_PX}px`} width={`${HUE_SELECTOR_WIDTH_PX}px`}/>
                    <Marker style={{ left: HUE_SELECTOR_WIDTH_PX / 2, transform: `translateY(${hueY}px) translate(-50%, -50%)`, border: '1px solid black' }}/>
                </CanvasContainer>
            </ColorPickerBody>
            <ColorHistory/>
        </Wrapper>
    );
}
