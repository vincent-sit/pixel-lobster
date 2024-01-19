import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../contexts/color-context';
import { IsPointerDownContext } from '../../contexts/is-pointer-down-context';

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

export function ColorPicker() {
    const {updateColor} = useContext(ColorContext);
    const [coreColor, setCoreColor] = useState('red');
    const {isPointerDown} = useContext(IsPointerDownContext);
    const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [sliderCtx, setSliderCtx] = useState<CanvasRenderingContext2D | null>(null);
    const colorCanvasRef = useRef<HTMLCanvasElement>(null);
    const colorSliderRef = useRef<HTMLCanvasElement>(null);

    // set color canvas
    useEffect(() => {
        if (!colorCanvasRef.current || !colorSliderRef.current) {
            return;
        }

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
        if (!colorCanvasRef.current || !colorSliderRef.current) {
            return;
        }

        const currSliderCtx = colorSliderRef.current.getContext('2d');
        if (currSliderCtx) {
            setSliderCtx(currSliderCtx);
            
            const gradientV = currSliderCtx.createLinearGradient(0, 0, 0, 300);
            gradientV.addColorStop(0, 'rgba(255, 0, 0, 1)');
            gradientV.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
            gradientV.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
            gradientV.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
            gradientV.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
            gradientV.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
            gradientV.addColorStop(1, 'rgba(255, 0, 0, 1)');
            currSliderCtx.fillStyle = gradientV;
            currSliderCtx.fillRect(0, 0, currSliderCtx.canvas.width, currSliderCtx.canvas.height); 
        }
    }, []);

    function sliderClick(e) {
        if (!colorSliderRef.current) return;    
        const rect = colorSliderRef.current.getBoundingClientRect();
        const imageData = colorSliderRef.current.getContext('2d')!.getImageData(e.clientX - rect.x, e.clientY - rect.y, 1, 1).data;        
        const rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
        setCoreColor(rgbaColor);        
    }

    return (
        <Wrapper>
            <div>
                <ColorPickerBody>
                    <canvas ref={colorCanvasRef} height="300" width="300"></canvas>
                    <canvas ref={colorSliderRef} onClick={sliderClick} height="300" width="30"></canvas>
                </ColorPickerBody>
            </div>
        </Wrapper>
    );
}
