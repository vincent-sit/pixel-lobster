import React from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../color-picker/color-picker';

const Wrapper = styled.div`
  background-color: #39B271;
  display: grid;
  grid-template-rows: 2fr 2fr;
  padding: 2rem;
  z-index: 9999;
`;

export function ToolBar() {
    return (
        <Wrapper>
            <div></div>
            <ColorPicker/>
        </Wrapper>
    );
}
