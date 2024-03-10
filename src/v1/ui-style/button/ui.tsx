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

export const Button = styled.button<{ buttonshape?: ButtonShape}>`
    background: lightgrey;    
    min-height: 50px;
    min-width: ${({ buttonshape }) => AdjustWidth(buttonshape)};
    font-family: "VT323", monospace;
    font-weight: 400;
    font-style: normal;
    padding: 0.5rem;
    border-width: 0;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
        filter: brightness(110%);
    }

    &:active {
        transform: scale(0.98); 
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24); 
    }
`;

export const PressedButton = styled(Button)<{ isPressed?: boolean; }>`
    filter: ${props => props.isPressed ? 'brightness(70%)' : 'brightness(100%)'};
`;
