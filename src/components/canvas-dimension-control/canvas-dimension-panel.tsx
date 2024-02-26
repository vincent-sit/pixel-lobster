import React, {useContext, useEffect, useRef} from 'react';
import { CanvasSizeInput } from './canvas-dimension-input';
import styled from 'styled-components';
import { DimensionContext } from '../../contexts/dimension-context';

const CanvasSizeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    background-color: #e0e0e0;
    margin: 0.4rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    border-radius: 0.6rem;    
    color: #4f4f4f;
    height: 3.3rem;
    font-size: 18px;
`;

export function CanvasSizePanel() {
    const {dimension, updateDimension} = useContext(DimensionContext);
    const widthInputRef = useRef<HTMLInputElement>(null);
    const heightInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!widthInputRef.current || !heightInputRef.current) return;
        
        updateDimension({
            width: parseInt(widthInputRef.current.value, 10),
            height: parseInt(heightInputRef.current.value, 10)
        });
        console.log('update dimension');
    }, [widthInputRef.current?.value, heightInputRef.current?.value]);

    return (
        <CanvasSizeWrapper>
            <span>Canvas size: </span>
            <CanvasSizeInput id='width' innerText='W' value={dimension.width} ref={widthInputRef}/>
            <span>x</span>
            <CanvasSizeInput id='height' innerText='H' value={dimension.height} ref={heightInputRef}/>
        </CanvasSizeWrapper>
    );
}
