import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Color from 'colorjs.io';
import { ColorContext } from '../../contexts/color-context';
import { usePointer } from '../../hooks/use-pointer';

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

const CoordinateMarker = styled.canvas`
    position: absolute;

`;

interface Coord {
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
    const colorCoordCircleRef = useRef<HTMLCanvasElement>(null);
    const [markerPrevCoord, setMarkerPrevCoord] = useState<Coord>({x: 0, y: 0});
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

    function drawPositionMarker(x: number, y: number) {
        if (!colorCoordCircleRef.current) return;

        const currCoordCtx = colorCoordCircleRef.current.getContext('2d');

        if (!currCoordCtx) return;

        currCoordCtx.beginPath();
        currCoordCtx.arc(x, y, 5, 0, 2 * Math.PI);
        currCoordCtx.stroke();
        currCoordCtx.closePath();
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

    useEffect(() => {
        drawPositionMarker(colorX, colorY);
        setMarkerPrevCoord({x: colorX, y:colorY});
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

    // // set color selection coord and draw circle
    useEffect(() => {
        if (!colorCanvasRef.current || !colorCoordCircleRef.current) return;
        
        const indicatorCtx = colorCoordCircleRef.current.getContext('2d');

        if (indicatorCtx) {
            indicatorCtx.clearRect(markerPrevCoord.x, markerPrevCoord.y, indicatorCtx.canvas.width, indicatorCtx.canvas.height);
            drawPositionMarker(colorX, colorY);
        }

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

    function handleCanvasInteract() {
        if (!isColorDown || !colorCanvasRef.current) return;

        // set new coordinates to draw indicator
        // const newCoord : Coord = {x : e.clientX - rect.x, y : e.clientY - rect.y};
        // setSelectionCoord(newCoord);
        
        // set color chosen

        const saturation = colorX / colorCanvasRef.current.width;
        const value = colorY / colorCanvasRef.current.height;        
        const newColor = new Color('hsv', [color.hsl.h, saturation * 100, (1 - value) * 100]);                
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
                    <canvas ref={colorCoordCircleRef}/>
                    {/* <canvas ref={colorCanvasRef} onPointerUp={handleCanvasInteract} onPointerMove={handleCanvasInteract} height="300" width="300"></canvas> */}
                    <canvas ref={colorCanvasRef} height="300" width="300"></canvas>
                    <canvas ref={colorSliderRef} onClick={sliderClick} height="300" width="30"></canvas>
                </ColorPickerBody>
            </div>
        </Wrapper>
    );
}
