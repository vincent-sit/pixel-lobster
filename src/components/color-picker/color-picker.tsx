import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../contexts/color-context';
import { IsPointerDownContext } from '../../contexts/is-pointer-down-context';

const Wrapper = styled.div`
    background-color: #D32A2A;    
`;

const ColorPickerBody = styled.div`
    background-color: white;
    height: 150px;
    width: 185px;
    border: solid 1px #ccc;
    opacity: 0;
    padding: 5px;
`;

export function ColorPicker() {
    const {updateColor} = useContext(ColorContext);
    const {isPointerDown} = useContext(IsPointerDownContext);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const colorCanvasRef = useRef<HTMLCanvasElement>(null);

    // set color canvas
    useEffect(() => {
        if (!colorCanvasRef.current) {
            return;
        }

        const currCtx = colorCanvasRef.current.getContext('2d');
        if (currCtx) {
            setCtx(currCtx);
            currCtx.fillStyle = 'blue';
            currCtx.fillRect(0, 0, colorCanvasRef.current.width, colorCanvasRef.current.height);
        }
    }, []);

    return (
        <Wrapper>
            <div>
                <button onClick={() => {updateColor('red');}}>red</button>
                <button onClick={() => {updateColor('yellow');}}>yellow</button>
                <input type="checkbox" id="color-input" checked></input>

                <ColorPickerBody>
                    <canvas ref={colorCanvasRef} height="150" width="150"></canvas>
                    <canvas id="color-strip" height="150" width="30"></canvas>
                </ColorPickerBody>
            </div>
        </Wrapper>
    );
}
