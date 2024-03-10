import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { ButtonWrapper } from '../../../ui-style/button';

const StyledDialog = styled.dialog`
    position: fixed;
    background-color: white;
    width: 20%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    z-index: 1;
    text-align: center;

    &::backdrop {
        background-color: black;
        opacity: 0.7;
    }

    @media (min-width: 600px) {
        .Modal {
            width: 500px;
            left: calc(50% - 250px);
        }
    }
`;

const ResizeContent = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 0.5fr 1fr 1fr;
`;

const StyledForm = styled.form`
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;

const Title = styled.span`
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 1;
`;

const InputLabel = styled.label`
    display: flex;
    flex-direction: column;
`;

interface ResizeDialogProps {
    dialogId : string,
    width : number,
    height : number,
    onSubmit : (newHeight : number, newWidth : number) => void,
    canvas : HTMLCanvasElement
}

export function ResizeDialog({dialogId, width, height, onSubmit, canvas} : ResizeDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [ widthState, setWidthState ] = useState(width.valueOf());
    const [ heightState, setHeightState ] = useState(height.valueOf());

    const onConfirm = () => {
        if (!dialogRef.current) return;
        onSubmit(heightState, widthState);
        canvas.width = widthState;
        canvas.height = heightState;
        dialogRef.current.close();
    };

    const closeDialog = () => {
        dialogRef.current?.close();
    };

    const onChange = (e : React.ChangeEvent<HTMLInputElement>, 
        setState : React.Dispatch<React.SetStateAction<number>>) => 
    {
        let numericValue = e.target.value.replace(/[^0-9]/g, '');
        if (!numericValue) numericValue = '0';
        setState(parseInt(numericValue));
    };

    return (
        <StyledDialog id={dialogId} ref={dialogRef}>
            <ResizeContent>
                <Title>Resize Canvas</Title>
                <StyledForm>
                    <InputLabel htmlFor='w'>
                        <span>W</span>
                        <input 
                            id='w' name='width' type="text"
                            value={ widthState.toString() }
                            onChange={ (e) => onChange(e, setWidthState) }
                            style={{ width: '25px', textAlign: 'center' }}
                        />
                    </InputLabel>
                    <span>x</span>
                    <InputLabel htmlFor='h'>H
                        <input
                            id='h' name='height' type="text"
                            value={ heightState.toString() }
                            onChange={ (e) => onChange(e, setHeightState) }
                            style={{ width: '25px', textAlign: 'center' }}
                        />
                    </InputLabel>
                </StyledForm>
                <ButtonWrapper 
                    onClick={onConfirm}
                    style={{gridColumnStart:'1', gridColumnEnd:'3', gridRow:'3', justifySelf:'center'}}
                    buttonshape='rectangle'
                    autoFocus
                >
                    Confirm
                </ButtonWrapper>
                <ButtonWrapper 
                    onClick={closeDialog}
                    style={{gridColumnStart:'4', gridColumnEnd:'6', gridRow:'3', justifySelf:'center'}}
                    buttonshape='rectangle'
                >
                    Close
                </ButtonWrapper>
            </ResizeContent>
        </StyledDialog>
    );
}
