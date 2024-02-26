import styled from 'styled-components';

type ButtonShape = 'square' | 'rectangle';

const AdjustWidth = (buttonShape?: ButtonShape) => {
    switch (buttonShape) {
        case 'square':
            return '50px';
        case 'rectangle':
            return '85px';
        default:
            return '50px';
    }
};

export const ButtonWrapper = styled.button<{ buttonshape?: ButtonShape}>`
    background: lightgrey;    
    min-height: 50px;
    min-width: ${({ buttonshape }) => AdjustWidth(buttonshape)};
    font-family: "VT323", monospace;
    font-weight: 400;
    font-style: normal;

    padding: 0;
    border-width: 0;

    &:hover {
        cursor: pointer;
        filter: brightness(110%);
    }

    &:active {
        transform: scale(0.98); 
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24); 
    }
`;
