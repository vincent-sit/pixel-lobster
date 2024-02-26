import styled from 'styled-components';

export enum BUTTONSHAPE {
    SQUARE,
    RECTANGLE
}

const AdjustWidth = (buttonShape?: BUTTONSHAPE) => {
    switch (buttonShape) {
        case BUTTONSHAPE.SQUARE:
            return '50px';
        case BUTTONSHAPE.RECTANGLE:
            return '85px';
        default:
            return '50px';
    }
};

export const ButtonWrapper = styled.button<{ buttonshape?: BUTTONSHAPE}>`
    display: block;
    background: lightgrey;    
    height: 50px;
    width: ${({ buttonshape }) => AdjustWidth(buttonshape)};
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
