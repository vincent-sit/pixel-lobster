import React, { useContext } from 'react';
import styled from 'styled-components';
import { ColorContext } from '../../contexts/color-context';

const Wrapper = styled.div`
    background-color: #D32A2A;    
`;

export function ColorPicker() {
    const {updateColor} = useContext(ColorContext);

    // create color picker and registers the color to the context so it can be used elsewhere

    return (
        <Wrapper>
            <div>
                <button onClick={() => {updateColor('red');}}>red</button>
                <button onClick={() => {updateColor('yellow');}}>yellow</button>
            </div>
        </Wrapper>
    );
}
