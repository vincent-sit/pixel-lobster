import React, { useContext, useEffect } from 'react';
import { ColorHistoryContext } from '../../contexts/color-history-context';
import { styled } from 'styled-components';
import Color from 'colorjs.io';
import { ColorContext } from '../../contexts/color-context';

const ColorBlocks = styled.div`    
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: row-reverse wrap;
    align-content: flex-start;
    justify-content: flex-start;
`;
const ColorBlock = styled.div`
    width: 25px;
    height: 25px;
    border: 0.1rem solid black;
`;

export function ColorHistory() {
    const {colors, updateColors} = useContext(ColorHistoryContext);
    const {updateColor} = useContext(ColorContext);

    function onColorClick(e : HTMLDivElement) {
        updateColor(new Color(e.style.backgroundColor));
    }

    useEffect(() => {
        const startingColors = [new Color('pink'), new Color('green')];
        updateColors(startingColors);
    }, []);

    function Render() {
        const colorBlocks = colors.map((color, index) =>
            <ColorBlock key={`color-${index}`} 
                style={{backgroundColor: color.toString()}}
                onClick={(e) => onColorClick(e.target as HTMLDivElement)}
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
