import styled from 'styled-components';

export const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`;

export const DrawingLayer = styled(Background)`
    z-index: 0;
`;
