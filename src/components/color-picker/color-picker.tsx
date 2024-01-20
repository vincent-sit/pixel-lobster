import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
`;

interface Coord {
    x : number,
    y : number
}

export function ColorPicker() {
    const {color, updateColor} = useContext(ColorContext);
    const [coreColor, setCoreColor] = useState('red');
    const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [sliderCtx, setSliderCtx] = useState<CanvasRenderingContext2D | null>(null);
    const colorCanvasRef = useRef<HTMLCanvasElement>(null);
    const colorSliderRef = useRef<HTMLCanvasElement>(null);
    const colorSelectedRef = useRef<HTMLDivElement>(null);
    const colorCoordCircleRef = useRef<HTMLCanvasElement>(null);
    const [selectionCoord, setSelectionCoord] = useState<Coord>({x: 0, y: 0});
    const { isDown, x: pointerX, y: pointerY } = usePointer(colorCanvasRef);

    // set color canvas
    useEffect(() => {
        if (!colorCanvasRef.current) return;

        const currCanvasCtx = colorCanvasRef.current.getContext('2d');
        if (currCanvasCtx) {
            setCanvasCtx(currCanvasCtx);
            
            const gradientH = currCanvasCtx.createLinearGradient(0, 0, currCanvasCtx.canvas.width, 0);
            gradientH.addColorStop(0, '#fff');
            gradientH.addColorStop(1, coreColor);
            currCanvasCtx.fillStyle = gradientH;
            currCanvasCtx.fillRect(0, 0, currCanvasCtx.canvas.width, currCanvasCtx.canvas.height);

            const gradientV = currCanvasCtx.createLinearGradient(0, 0, 0, 300);
            gradientV.addColorStop(0, 'rgba(0,0,0,0)');
            gradientV.addColorStop(1, '#000');
            currCanvasCtx.fillStyle = gradientV;
            currCanvasCtx.fillRect(0, 0, currCanvasCtx.canvas.width, currCanvasCtx.canvas.height); 
        }
    }, [coreColor]);

    // set color slider
    useEffect(() => {
        if (!colorSliderRef.current) return;

        const currSliderCtx = colorSliderRef.current.getContext('2d');
        if (currSliderCtx) {
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
        }
    }, []);

    useEffect(() => {
        if (!colorSelectedRef.current) return;
        colorSelectedRef.current.style.backgroundColor = color;
    }, [color]);

    // // set color selection coord and draw circle
    // useEffect(() => {
    //     if (!colorCanvasRef.current || !colorCoordCircleRef.current) return;
        
    //     const indicatorCtx = colorCoordCircleRef.current.getContext('2d');

    //     if (indicatorCtx) {
    //         indicatorCtx.beginPath();
    //         indicatorCtx.arc(selectionCoord.x, selectionCoord.y, 5, 0, 2 * Math.PI);
    //         indicatorCtx.stroke();
    //     }

    // }, [selectionCoord]);

    function sliderClick(e: React.PointerEvent<HTMLCanvasElement>) {
        if (!colorSliderRef.current) return;    
        const rect = colorSliderRef.current.getBoundingClientRect();
        const imageData = colorSliderRef.current.getContext('2d')!.getImageData(e.clientX - rect.x, e.clientY - rect.y, 1, 1).data;
        const rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
        setCoreColor(rgbaColor);        
    }

    function handleCanvasInteract() {
        if (!isDown || !colorCanvasRef.current) return;

        // set new coordinates to draw indicator
        // const newCoord : Coord = {x : e.clientX - rect.x, y : e.clientY - rect.y};
        // setSelectionCoord(newCoord);
        
        // set color chosen
        const imageData = colorCanvasRef.current.getContext('2d', {willReadFrequently: true})!.getImageData(pointerX, pointerY, 1, 1).data;
        const rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
        updateColor(rgbaColor);  
    }

    return (
        <Wrapper>
            <div>
                <div style={{width: 100, height: 30}} ref={colorSelectedRef}></div>
                <ColorPickerBody>
                    {/* <canvas ref={colorCoordCircleRef}/> */}
                    <canvas ref={colorCanvasRef} onPointerUp={handleCanvasInteract} onPointerMove={handleCanvasInteract} height="300" width="300"></canvas>
                    <canvas ref={colorSliderRef} onClick={sliderClick} height="300" width="30"></canvas>
                </ColorPickerBody>
            </div>
        </Wrapper>
    );
}
