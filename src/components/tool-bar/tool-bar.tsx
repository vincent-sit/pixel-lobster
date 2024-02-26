import React from 'react';
import styled from 'styled-components';
import { ColorPicker } from '../color-picker/color-picker';
import { ToolButtonCollection } from './tool-button-collection';

const Wrapper = styled.div`
  background-color: #39B271;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
`;

export function ToolBar() {
    return (
        <Wrapper>
            <ToolButtonCollection/>
            <ColorPicker/>
        </Wrapper>
    );
}
