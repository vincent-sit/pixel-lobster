import React from 'react';
import Color from 'colorjs.io';
import { styled } from 'styled-components';

interface ColorHistoryProps {
    colorHistory : Color[],
    onChange : (newColor : Color) => void
}

const ColorHistoryContainer = styled.div`
    background-color: #f5f5f5;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    height: 55px;
    width: 325px;
    gap: 0.2rem;
    padding: 0.4rem;
    box-shadow: 0.5px 0.5px 0.5px 0.5px #878787;
`;
const ColorHistoryBlock = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0.5px 0.5px 0.5px 0.5px #878787;
`;

export function ColorHistory({colorHistory, onChange} : ColorHistoryProps) {
    return (
        <ColorHistoryContainer>
            {[...colorHistory].reverse().map((color) =>
                <ColorHistoryBlock key={color.to('srgb').toString()}
                    style={{backgroundColor: color.to('srgb').toString()}}
                    onClick={() => onChange(color)}
                />)
            }
        </ColorHistoryContainer>
    );
}
