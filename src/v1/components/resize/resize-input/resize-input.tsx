import React from 'react';
import { SizeInputDiv } from '../../../ui-style/alert-dialog/alert-dialog';

export interface ResizeInputProps {
    id : string,
    innerText : string,
    innerValue : string,
    // eslint-disable-next-line no-unused-vars
    onChange : (newValue : string) => void
}

export function ResizeInput({id, innerText, innerValue, onChange} : ResizeInputProps) {

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        onChange(numericValue);
    }

    return (
        <SizeInputDiv>
            <label htmlFor={id}>{innerText}</label>
            <input 
                id={id}
                name={innerText}
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
}
