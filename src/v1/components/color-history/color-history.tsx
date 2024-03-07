import React from 'react';
import Color from 'colorjs.io';
import { styled } from 'styled-components';

interface ColorHistoryProps {
    colorHistory : Color[],
    onChange : (newColor : Color) => void
}

const ColorBlocks = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 50px;
    width: 250px;
    gap: 0;
`;
const ColorBlock = styled.div`
    width: 25px;
    height: 25px;
    border: 0.1rem solid black;
    box-sizing: border-box;
`;

export function ColorHistory({colorHistory, onChange} : ColorHistoryProps) {
    return (
        <ColorBlocks>
            {[...colorHistory].reverse().map((color, index) =>
                <ColorBlock key={`color-${index}`}
                    style={{backgroundColor: color.to('srgb').toString()}}
                    onClick={() => onChange(color)}
                />)
            }
        </ColorBlocks>
    );
}
