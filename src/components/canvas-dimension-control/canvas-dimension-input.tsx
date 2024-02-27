import React, { forwardRef, useState, useEffect } from 'react';
import styled from 'styled-components';

interface CanvasInputProps {
    id: string,
    innerText: string,
    value: string
}

const SizeInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

export const CanvasSizeInput = forwardRef(function CanvasSizeInput(props: CanvasInputProps, ref: React.ForwardedRef<HTMLInputElement>) {
    const [innerValue, setInnerValue] = useState('');

    useEffect(() => {
        setInnerValue(props.value);
    }, []);

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        setInnerValue(numericValue);
    }

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
                onChange={handleChange}
            />
        </SizeInputDiv>
    );
});
