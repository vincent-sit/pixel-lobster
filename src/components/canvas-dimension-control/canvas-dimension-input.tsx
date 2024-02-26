import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';

interface CanvasInputProps {
    id: string,
    innerText: string,
    value: number    
}

const SizeInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

export const CanvasSizeInput = forwardRef(function CanvasSizeInput(props: CanvasInputProps, ref: React.ForwardedRef<HTMLInputElement>) {
    const [innerValue, setInnerValue] = useState(0);

    useEffect(() => {
        setInnerValue(props.value);
    }, []);

    return (
        <SizeInputDiv>
            <label htmlFor={props.id}>{props.innerText}</label>
            <input 
                id={props.id}
                name={props.innerText}
                ref={ref}

                type="text"
                value={innerValue}
                style={{
                    width: '25px', 
                    textAlign: 'center'
                }}
                onChange={(e) => setInnerValue(parseInt(e.target.value, 10))}
            />
        </SizeInputDiv>
    );
});
