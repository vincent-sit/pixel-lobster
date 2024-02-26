import React from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../color-picker/color-picker';
import { ToolButtonCollection } from './tool-button-collection';

const Wrapper = styled.div`
  background-color: #39B271;
  display: grid;
  grid-template-rows: 2fr 2fr;
  padding: 2rem;
  z-index: 999;
`;

export function ToolBar() {
    return (
        <Wrapper>
            <ToolButtonCollection/>
            <ColorPicker/>
        </Wrapper>
    );
}
