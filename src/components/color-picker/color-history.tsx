import React, { useContext, useEffect } from 'react';
import { ColorHistoryContext } from '../../contexts/color-history-context';
import { styled } from 'styled-components';
import Color from 'colorjs.io';
import { ColorContext } from '../../contexts/color-context';

const ColorBlocks = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const ColorBlock = styled.div`
    width: 25px;
    height: 25px;
    border: 0.1rem solid black;
`;

export function ColorHistory() {
    const {colors, updateColors} = useContext(ColorHistoryContext);
    const {updateColor} = useContext(ColorContext);

    function onColorClick(color: Color) {
        updateColor(color);
    }

    useEffect(() => {
        updateColors([]);
    }, []);

    function Render() {
        const colorBlocks = [...colors].reverse().map((color, index) =>
            <ColorBlock key={`color-${index}`}
                style={{backgroundColor: color.to('srgb').toString()}}
                onClick={() => onColorClick(color)}
            />
        );
        return (
            <ColorBlocks>
                {colorBlocks}
            </ColorBlocks>
        );
    }

    return (
        <div>
            {Render()}
        </div>
    );
}
